import {Router} from 'express';
import { userController } from './users.controller';

const router = Router() 

router.get("/", userController.getUsers)

router.put('/:id', userController.updateUser)

export const userRouter = router 