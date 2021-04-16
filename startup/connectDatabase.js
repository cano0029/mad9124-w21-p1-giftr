import mongoose from 'mongoose'
import config from 'config'
import logger from './logger.js'

const log = logger.child({ module: 'connectDB' })
const dbConfig = config.get('db')

export default function connectDatabase() {
    mongoose
        .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {
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
