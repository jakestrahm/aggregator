
import express from 'express';
import {
	// logout,
	removeItem,
	editItem,
	findItem,
	listItems,
	createItem,
} from '../handlers/items';
//import { protect } from '../middleware/auth';

const router = express.Router();

router
	.route('/')
	.get(listItems)
	.post(createItem);

router
	.route('/:id')
	.get(findItem)
	.put(editItem) //TODO need to protect
	.delete(removeItem) //TODO need to protect

export { router };
