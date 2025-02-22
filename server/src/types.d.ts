type UserUpdate = {
	email?: string,
	username?: string,
	password?: string
}

type UserInsert = {
	username: string
	email: string
	password_hash: string
}

type UserAuthenticate = {
	email?: string,
	username?: string
	password: string
}

type UserSelect = {
	id: number,
	email: string,
	username: string,
	created_at: string
}

export { UserUpdate, UserInsert, UserAuthenticate, UserSelect }
