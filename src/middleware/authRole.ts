import {Request,Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import config from '../config/index';

const authRole = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            const token = req?.headers?.authorization?.split(" ")[1]
        
            if(!token) {
                throw new Error("You ar not allowed")
            }

            const decoded = jwt.verify(token, config.jwtSecrect as string) as JwtPayload

            req.user = decoded
            next()
        }catch(err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

export default authRole