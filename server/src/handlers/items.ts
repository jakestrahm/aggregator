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
import { ItemInsert, ItemUpdate, Property } from '../types';

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
	const { name, item_type, properties } = req.body;
	const id = parseInt(req.params.id);

	if (name) {
		update.name = name;
	}

	if (item_type) {
		update.item_type = item_type;
	}

	if (Array.isArray(properties) && properties.length > 0) {
		update.properties = properties
	}

	if (!name && !item_type && !update.properties?.length) {
		throw new ResponseError('no fields to update', 400);
	}

	const result = await updateItemById(id, update);
	console.log(result);
	res.json(result);
});

const createItem = asyncHandler(async (req: Request, res: Response) => {
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
