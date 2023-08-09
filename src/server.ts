
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import postRoutes from './routes/posts'
import sessionMiddleware from './middlewares/session';
import AuthRoutes from './routes/auth'


dotenv.config()


const port = process.env.PORT

const startServer = () => {
    const app = express()

    app.use(express.urlencoded({ extended: false }));
    app.use(cors())
    app.use(sessionMiddleware)
    app.use(express.json())
    

    app.get('/', (req: Request, res: Response) => {
        // @ts-ignore
        req.session.isAuth = true
        console.log(req.session)
        res.send('hello again')
    })

    app.use('/auth', AuthRoutes)
    app.use('/posts', postRoutes)

    app.listen(port, () => console.log(`server is listening at port ${port}`))
}

export default startServer
