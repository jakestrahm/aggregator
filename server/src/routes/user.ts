import express from 'express';
import {
	register,
	login,
	// logout,
	removeUser,
	editUser,
	findUser,
	listUsers,
} from '../handlers/users';
//import { protect } from '../middleware/auth';

const router = express.Router();

router
	.route('/')
	.get(listUsers);

router
	.route('/register')
	.post(register);

router
	.route('/login')
	.post(login);

// router
// 	.route('/logout')
// .post(logout);

router
	.route('/:id')
	.get(findUser)
	.put(editUser) //TODO need to protect
	.delete(removeUser) //TODO need to protect

export { router };
