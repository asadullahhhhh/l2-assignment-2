import {Request, Response} from 'express';
import { userService } from './users.service';

const getUsers = async (req: Request, res: Response) => {
    try{
        const result = await userService.getUsers()

    if(result.rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No user found",
            data: result.rows
        })
    }

    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows
    })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const userController = {
    getUsers
}