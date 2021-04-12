import mongoose from 'mongoose'
import createDebug from 'debug'

const debug = createDebug('Giftr:db')

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
            debug('Successfully connected to MongoDB ...')
        })
        .catch((err) => {
            debug('Error connecting to MongoDB ... ', err.message)
            process.exit(1)
        })
}
