import {Request, Response} from 'express';
import { signInService } from './signIn.service';

const loginUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body

        const result = await signInService.loginUser(email, password)

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })
    }catch(err: any) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const signInController = {
    loginUser
}