import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import connectDatabase from './startup/connectDatabase.js'
import sanitizeMongo from 'express-mongo-sanitize'
import peopleRouter from './routes/person.js'
import giftsRouter from './routes/gift.js'
import authRouter from './routes/auth/index.js'
import handleErrors from './middleware/handleErrors.js'
import logger from './startup/logger.js'

connectDatabase()

const app = express()

logger.info(app.get('env'))

// middlewares
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())

// health check route
app.get('/', (req, res) => res.send({ data: { healthStatus: 'UP' } }))

// route handlers
app.use('/api/people', peopleRouter)
app.use('/api/people', giftsRouter)
app.use('/auth', authRouter)
app.use(handleErrors)

export default app
