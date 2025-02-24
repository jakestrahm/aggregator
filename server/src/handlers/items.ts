import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { ResponseError } from '../utilities/ResponseError';
import {
	selectItemById,
	selectItems,
	deleteItemById,
	insertItem,
	updateItemById,
} from '../models/items';
import { ItemInsert, ItemUpdate } from '../types';

const listItems = asyncHandler(async (_: Request, res: Response) => {
	let result = await selectItems()
	console.log(result);
	res.json(result);
});

const findItem = asyncHandler(async (req: Request, res: Response) => {
	let id: number = parseInt(req.params.id)

	if (!id) {
		throw new ResponseError(`missing item id`, 401)
	}

	let result = await selectItemById(id)
	console.log(result)
	res.json(result)
});

const removeItem = asyncHandler(async (req: Request, res: Response) => {
	let id: number = parseInt(req.params.id)

	if (!id) {
		throw new ResponseError(`missing item id`, 401)
	}

	let result = await deleteItemById(id)
	console.log(result)
	res.json(result)
});

const editItem = asyncHandler(async (req: Request, res: Response) => {
	const update: ItemUpdate = {};
	const { name, item_type, ...propertyFields } = req.body;

	// Handle direct fields
	if (name) {
		update.name = name;
	}
	if (item_type) {
		update.item_type = item_type;
	}

	// Handle properties - now we use propertyFields directly
	if (Object.keys(propertyFields).length > 0) {
		// Each field in propertyFields becomes a property
		update.properties = Object.entries(propertyFields).map(([name, value]) => ({
			property_name: name,
			property_value: String(value)
		}));
	}

	if (!name && !item_type && !update.properties?.length) {
		throw new ResponseError('no fields to update', 400);
	}

	const result = await updateItemById(parseInt(req.params.id), update);
	console.log(result);
	res.json(result);
});

const createItem = asyncHandler(async (req: Request, res: Response) => {
	//todo
	// const validEmail = req.body?.email && validator.isEmail(req.body.email)
	// const validItemname = req.body?.itemname && validator.isLength(req.body.itemname, { min: 3, max: 20 })
	// const validPassword = req.body?.password && validator.isStrongPassword(req.body.password)

	// if (!validEmail) {
	// 	throw new ResponseError(`invalid email`, 400)
	// } else if (!validItemname) {
	// 	throw new ResponseError(`invalid itemname`, 400)
	// } else if (!validPassword) {
	// 	throw new ResponseError(`invalid password`, 400)
	// }

	let newItem: ItemInsert = {
		name: req.body.name,
		item_type: req.body.item_type,
		properties: req.body.properties
	}

	let result = await insertItem(newItem)
	console.log(result)
	res.json(result);
});


export { listItems, findItem, removeItem, editItem, createItem }
