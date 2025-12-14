import {Request, Response} from 'express';
import { ragistrationService } from './ragistration.service';

const userRagistration = async (req: Request, res: Response) => {
    try{
        const result = await ragistrationService.userRagistration(req.body)

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const registrationController = {
    userRagistration
}