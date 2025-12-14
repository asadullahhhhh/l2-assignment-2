import {Router} from 'express';
import {signInController} from './signIn.controller';

const router = Router()

router.post('/signin', signInController.loginUser)

export const loginRouter = router