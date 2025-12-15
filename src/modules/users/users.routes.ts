import {Router} from 'express';
import { userController } from './users.controller';

const router = Router() 

// ===> get all users
router.get("/", userController.getUsers)

// ===> upadte single user 
router.put('/:id', userController.updateUser)

// ===> delete single user
router.delete("/:id", userController.deleteUser)

export const userRouter = router 