import mongoose from 'mongoose'
import config from './config/dbConfig'

import startServer from './server'

const dbConnect = async () => {
    try {
        await mongoose.connect(config.mongoUri)
        console.log('connected')
        startServer()
    } catch (err) {
        console.log(err)
    }
}

dbConnect()
