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

// ===> get vehicles
const getVehicles = async (req: Request, res: Response) => {
    try{
        const result = await vehiclesService.getVehicles()

        if(result.rows.length === 0){
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: result.rows 
            })
        }

        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows 
        })
    }catch(err: any) {
        success: false
        message: err.message
    }
}

// ===> get Single Vehicle 
const getSingleVehicle = async (req: Request, res: Response) => {
    try{
        const result = await vehiclesService.getSingleVehicle(req.params.id)

        if(result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Not Vehicle Found",
                data: result.rows
            })
        }

        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0]
        })
    }catch(err: any) {
        success: false
        message: err.message
    }
}

export const vehicleController = {
    createVehicles,
    getVehicles,
    getSingleVehicle
}