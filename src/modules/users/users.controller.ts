import {Request, Response} from 'express';
import { userService } from './users.service';

// ===> get all users 
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

// ===> update user
const updateUser = async (req: Request, res: Response) => {
    try{
        const result = await userService.updateuser( req.params.id, req.body)

        res.status(200).json({
            success: true,
            message: "Usr updated successfully",
            data: result
        })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// ===> delete user 
const deleteUser = async (req: Request, res: Response) => {
    try{
        const result = await userService.deleteUser(req.params.id)

        if(result.rowCount === 0) {
            throw new Error("User not found")
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const userController = {
    getUsers,
    updateUser,
    deleteUser
}