import mongoose from 'mongoose'
import config from 'config'
import logger from './logger.js'

const log = logger.child({ module: 'connectDB' })
// const dbConfig = config.get('db')

// export default function connectDatabase() {
//     mongoose
//         .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false,
//             useUnifiedTopology: true,
//         })
//         .then(() => {
//             log.info('Successfully connected to MongoDB ...')
//         })
//         .catch((err) => {
//             log.error('Error connecting to MongoDB ... ', err.message)
//             process.exit(1)
//         })
// }

// AWS deployment  
export default async function connectDatabase() {
    const { scheme, host, port, name, username, password, authSource } = config.get('db')
    const credentials = username && password ? `${username}:${password}@` : ''

    let connectionString = `${scheme}://${credentials}${host}`

    if (scheme === 'mongodb') {
        connectionString += `:${port}/${name}?authSource=${authSource}`
    } else {
        connectionString += `/${authSource}?retryWrites=true&w=majority`
    }

    try {
        await mongoose.connect(
            connectionString,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                dbName: name
            }
        )
        log.info(`Connected to MongoDB at ${name}...`)
    } catch(err) {
        log.error(`Error connecting to MongoDB ...`, err)
        process.exit(1)
    }
}

