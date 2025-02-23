//users
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

// items
type ItemUpdate = {
	name?: string,
	category?: string,
	properties?: Record<string, any>
}

type ItemInsert = {
	name: string,
	category: string,
	properties: Record<string, any>
}

type ItemSelect = {
	id: number,
	name: string,
	category: string,
	properties: Record<string, any>
}

// groups
type GroupUpdate = {
	name?: string,
	description?: string
}

type GroupInsert = {
	name: string
	description: string | null
}

type GroupSelect = {
	id: number,
	name: string,
	description: string | null
}

// group items
type GroupItemUpdate = {
	quantity: number
}

type GroupItemInsert = {
	group_id: number
	item_id: number
	quantity: number
}

type GroupItemSelect = {
	group_id: number,
	item_id: number,
	quantity: number
}

export {
	UserUpdate,
	UserInsert,
	UserAuthenticate,
	UserSelect,
	ItemUpdate,
	ItemInsert,
	ItemSelect,
	GroupUpdate,
	GroupInsert,
	GroupSelect,
	GroupItemUpdate,
	GroupItemInsert,
	GroupItemSelect,
}
