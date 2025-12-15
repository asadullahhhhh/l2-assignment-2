import {Router} from 'express';
import {vehicleController} from './vehicles.controller';

const router = Router()

// ===> create vehicle
router.post('/', vehicleController.createVehicles)

export const vehiclesRouter = router