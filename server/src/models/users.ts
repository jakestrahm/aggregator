import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sql } from '../db/db';
import { UserAuthenticate, UserInsert, UserUpdate } from '../types';
import { DbError, DbErrorType } from '../utilities/DbError';
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'backup-secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1m';

const selectUserById = async (id: number) => {
	try {
		const user = await sql`
		select
		id,
		username,
		email,
		created_at
		from users
		where id = ${id}
		`;

		if (user.length == 0) {
			throw new DbError(`user of id: ${id} not found`, DbErrorType.MissingRecord)
		}

		return user;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const selectUsers = async () => {
	try {
		const users = await sql`
		select
		id,
		username,
		email,
		created_at
		from users
		order by id
		`;

		return users
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const deleteUserById = async (id: number) => {
	try {
		await selectUserById(id);

		const user = await sql`
		delete from users
		where id = ${id}
		returning id, username, email, created_at
		`;

		if (user.length == 0) {
			console.log(user)
			throw new DbError(`deletion of user with if ${id} failed`, DbErrorType.ServerError)
		}

		return user;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const insertUser = async (userInsert: UserInsert) => {
	try {
		let { username, email, password_hash } = userInsert;

		const user = await sql`
		insert into users (username, email, password_hash)
		values (${username}, ${email}, ${password_hash})
		returning id, username, email, created_at
		`;

		if (user.length == 0) {
			throw new DbError(`user insert failed`, DbErrorType.ServerError)
		}

		return user;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const updateUserById = async (id: number, userUpdate: UserUpdate) => {
	try {
		let { username, email } = userUpdate;

		let setStatement = ``;

		switch (userUpdate) {
			case userUpdate.email && userUpdate.username:
				setStatement = `set username= ${username}, email=${email}`
				break;
			case userUpdate.email:
				setStatement = `set email=${email}`
				break;
			case userUpdate.username:
				setStatement = `set username=${username}`
				break;
		}

		await selectUserById(id);

		const updateUser = await sql`
		update users
		${setStatement}
		where id = ${id}
		returning id, username, email, created_at`

		if (updateUser.length == 0) {
			throw new DbError(`updating user of id: ${id} failed`, DbErrorType.ServerError)
		}

		return updateUser;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

const createToken = async (Login: UserAuthenticate) => {
	try {
		let email = Login.email;
		let username = Login.username;
		let password = Login.password;

		const user = await sql`
		select
		password_hash,
		id
		from users
		${email ? sql`where email = ${email}` : sql``}
		${username ? sql`where username = ${username}` : sql``} `

		if (user.length == 0) {
			throw new DbError(`user not found`, DbErrorType.MissingRecord)
		}

		if (! await bcrypt.compare(password, user[0].password_hash)) {
			throw new DbError("incorrect password", DbErrorType.MissingRecord)
		}

		const token = jwt.sign({ userId: user[0].id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
		console.log({ token })

		return {
			token,
			user: {
				id: user[0].id,
				username: username && { username },
				email: email ? email : {},
			}
		};
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export { createToken, selectUserById, selectUsers, deleteUserById, insertUser, updateUserById }
