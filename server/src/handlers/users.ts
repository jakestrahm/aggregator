import validator from 'validator';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { ResponseError } from '../utilities/ResponseError';
import { UserAuthenticate, UserInsert, UserUpdate } from '../types';
import {
	selectUserById,
	selectUsers,
	deleteUserById,
	insertUser,
	updateUserById,
	createToken,
} from '../models/users';

const listUsers = asyncHandler(async (_: Request, res: Response) => {
	let result = await selectUsers()
	console.log(result);
	res.json(result);
});

const findUser = asyncHandler(async (req: Request, res: Response) => {
	let id: number = parseInt(req.params.id)

	if (!id) {
		throw new ResponseError(`missing user id`, 401)
	}

	let result = await selectUserById(id)
	console.log(result)
	res.json(result)
});

const removeUser = asyncHandler(async (req: Request, res: Response) => {
	let id: number = parseInt(req.params.id)

	if (!id) {
		throw new ResponseError(`missing user id`, 401)
	}

	let result = await deleteUserById(id)
	console.log(result)
	res.json(result)
});

const editUser = asyncHandler(async (req: Request, res: Response) => {
	const update: UserUpdate = {}
	const email: string = req.body?.email
	const username: string = req.body?.username
	const password: string = req.body?.password

	if (email) {
		const validEmail = validator.isEmail(email)

		if (validEmail) {
			update.email = req.body.email
		} else {
			throw new ResponseError(`invalid email`, 400)
		}
	}

	if (username) {
		const validusername = validator.isLength(req.body.username, { min: 3, max: 20 })

		if (validusername) {
			update.username = req.body.username
		} else {
			throw new ResponseError(`invalid username`, 400)
		}
	}

	if (!username && !email) {
		throw new ResponseError('provide either email or username', 401)
	}

	if (password) {
		const validpassword = validator.isStrongPassword(req.body.password)

		if (validpassword) {
			update.password = req.body.password
		} else {
			throw new ResponseError(`invalid password`, 400)
		}
	} else {
		throw new ResponseError('missing password', 401)
	}

	const result = await updateUserById(parseInt(req.params.id), update)
	console.log(result)
	res.json(result);
});

const register = asyncHandler(async (req: Request, res: Response) => {
	const validEmail = req.body?.email && validator.isEmail(req.body.email)
	const validUsername = req.body?.username && validator.isLength(req.body.username, { min: 3, max: 20 })
	const validPassword = req.body?.password && validator.isStrongPassword(req.body.password)

	if (!validEmail) {
		throw new ResponseError(`invalid email`, 400)
	} else if (!validUsername) {
		throw new ResponseError(`invalid username`, 400)
	} else if (!validPassword) {
		throw new ResponseError(`invalid password`, 400)
	}

	const password_hash = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));

	let newUser: UserInsert = {
		email: req.body.email,
		username: req.body.username,
		password_hash: password_hash
	}

	let result = await insertUser(newUser)
	console.log(result)
	res.json(result);
});

const login = asyncHandler(async (req: Request, res: Response) => {
	let password: string = req.body?.password
	let email: string = req.body?.email
	let username: string = req.body?.username


	if (!email && !username) {
		throw new ResponseError('provide email or username.', 401)
	}

	if (!password) {
		throw new ResponseError('provide password.', 401)
	}

	let LoginInfo: UserAuthenticate = {
		password,
		...(email && { email }),
		...(username && { username }),
	}

	let token = await createToken(LoginInfo);
	console.log(token)
	res.json(token)
});

/*
	using jwt and "Loging out" client side currently,
	maybe eventually implement token black listing.
*/
// const Logout = asyncHandler(async (req: Request, res: Response) => {
// 	const token = req.headers.authorization
//
// 	if (!token) {
// 		throw new ResponseError('missing token', 401)
// 	}
//
// });

export { listUsers, findUser, removeUser, editUser, register, login, /*Logout*/ }
