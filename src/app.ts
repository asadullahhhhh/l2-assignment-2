import express, {Request, Response} from 'express';
import initDB from './database/db';
import { ragistrationRouter } from './modules/ragistration/ragistration.routes';

const app = express()

//json parse
app.use(express.json())

//initialize database
initDB()


// sign up api
app.use('/api/v1/auth', ragistrationRouter)

//root directory
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Server is running in their root path"
    })
})

export default app