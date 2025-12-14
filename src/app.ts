import express, {Request, Response} from 'express';
import initDB from './database/db';
import { ragistrationRouter } from './modules/ragistration/ragistration.routes';
import { loginRouter } from './modules/login/signIn.routes';
import { userRouter } from './modules/users/users.routes';

const app = express()

//json parse
app.use(express.json())

//initialize database
initDB()


// signup api
app.use('/api/v1/auth', ragistrationRouter)

//login api 
app.use('/api/v1/auth', loginRouter) 

// users api
app.use('/api/v1/users', userRouter)

//root directory
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running in their root path"
    })
})

export default app