import {Router} from 'express';
import { registrationController } from './registration.controller';

const router = Router()

router.post('/signup', registrationController.userRagistration)

export const ragistrationRouter = router