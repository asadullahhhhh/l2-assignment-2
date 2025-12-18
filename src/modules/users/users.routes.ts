import {Router} from 'express';
import { userController } from './users.controller';
import authRole from '../../middleware/authRole';

const router = Router() 

// ===> get all users
router.get("/", authRole(), userController.getUsers)

// ===> upadte single user 
router.put('/:id', userController.updateUser)

// ===> delete single user
router.delete("/:id", userController.deleteUser)

export const userRouter = router 