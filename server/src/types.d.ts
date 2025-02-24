// users
type UserUpdate = {
	email?: string
	username?: string
	password?: string
}

type UserInsert = {
	username: string
	email: string
	password_hash: string
}

type UserAuthenticate = {
	email?: string
	username?: string
	password: string
}

type UserSelect = {
	id: number
	email: string
	username: string
	created_at: string
}

// items
type ItemUpdate = {
	name?: string
	item_type?: string
	properties?: { property_name: string; property_value: string }[];
}

type ItemInsert = {
	name: string;
	item_type: string;
	properties?: { property_name: string; property_value: string }[];
};

type ItemSelect = {
	id: number;
	name: string;
	item_type: string;
	properties?: { property_name: string; property_value: string }[];
};

// item properties
type ItemPropertyInsert = {
	item_id: number
	property_name: string
	property_value: string
}

type ItemPropertySelect = {
	item_id: number
	property_name: string
	property_value: string
}

type ItemPropertyUpdate = {
	property_value?: string
}

// collections
type CollectionUpdate = {
	name?: string
	description?: string
}

type CollectionInsert = {
	name: string
	description?: string | null
}

type CollectionSelect = {
	id: number
	name: string
	description: string | null
}

// collection items
type CollectionItemUpdate = {
	quantity?: number
}

type CollectionItemInsert = {
	collection_id: number
	item_id: number
	quantity?: number
}

type CollectionItemSelect = {
	collection_id: number
	item_id: number
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
	ItemPropertyInsert,
	ItemPropertySelect,
	ItemPropertyUpdate,
	CollectionUpdate,
	CollectionInsert,
	CollectionSelect,
	CollectionItemUpdate,
	CollectionItemInsert,
	CollectionItemSelect,
}
