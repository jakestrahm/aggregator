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
	const update: ItemUpdate = {}
	const name: string = req.body?.name
	const category: string = req.body?.category
	const properties: Record<string, any> = req.body?.properties

	//todo actually implement checks
	if (name) {
		update.name = name
	} else {
		throw new ResponseError(`invalid name`, 400)
	}

	if (category) {
		update.category = category
	} else {
		throw new ResponseError(`invalid category`, 400)
	}

	if (properties) {
		update.properties = properties
	} else {
		throw new ResponseError(`invalid properties`, 400)
	}

	const result = await updateItemById(parseInt(req.params.id), update)
	console.log(result)
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
		category: req.body.category,
		properties: req.body.properties
	}

	let result = await insertItem(newItem)
	console.log(result)
	res.json(result);
});


export { listItems, findItem, removeItem, editItem, createItem }
