import mongoose from 'mongoose'
import logger from './logger.js'

const log = logger.child({ module: 'connectDB' })

export default function connectDatabase() {
    mongoose
        .connect(`mongodb://localhost:27017/Giftr`, {
            //${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .then(() => {
            log.info('Successfully connected to MongoDB ...')
        })
        .catch((err) => {
            log.error('Error connecting to MongoDB ... ', err.message)
            process.exit(1)
        })
}
