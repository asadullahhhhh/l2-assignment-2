import {Router} from 'express';
import {vehicleController} from './vehicles.controller';

const router = Router()

// ===> create vehicle
router.post('/', vehicleController.createVehicles)

// ===> get vehicles
router.get('/', vehicleController.getVehicles)

// ===> get sing vehicle 
router.get('/:id', vehicleController.getSingleVehicle)

// ===> update vehicle
router.put('/:id', vehicleController.updateVehicle)

// ===> delete vehicle 
router.delete('/:id', vehicleController.deleteVehicle)

export const vehiclesRouter = router