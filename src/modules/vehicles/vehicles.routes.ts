import {Router} from 'express';
import {vehicleController} from './vehicles.controller';

const router = Router()

// ===> create vehicle
router.post('/', vehicleController.createVehicles)

// ===> get vehicles
router.get('/', vehicleController.getVehicles)

// ===> get sing vehicle 
router.get('/:id', vehicleController.getSingleVehicle)

export const vehiclesRouter = router