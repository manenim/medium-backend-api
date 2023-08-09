import { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import MongoDBStotre from 'connect-mongodb-session'
import config from '../config/dbConfig'

const mongoDBStotreSession = MongoDBStotre(session)

const store = new mongoDBStotreSession({
    uri: config.mongoUri,
    collection: 'mySessions'
})

// Catch errors
store.on('error', (error) => {
  console.log(error);
});

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: 'some secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 *60 * 60
        },
        store: store,
    })(req, res, next)
}

export default sessionMiddleware