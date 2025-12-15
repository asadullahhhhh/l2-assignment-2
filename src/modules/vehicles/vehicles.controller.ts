import {Request, Response} from 'express';
import {vehiclesService} from './vehicles.service';

// ===> create vehicle
const createVehicles = async (req: Request, res: Response) => {
    try{
        const result = await vehiclesService.createVehicles(req.body)

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const vehicleController = {
    createVehicles
}