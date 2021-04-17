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

logger.info(app.get('env')) // tells us in the terminal what ENV we are in - defaults to development if we do not set the ENV variable
// run this command in the terminal to set to prod ENV... export NODE_ENV=production
// run this command in the terminal to set to dev ENV... export NODE_ENV=development

// middlewares
app.use(cors())
app.use(compression())
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())

// routes
app.get('/', (req, res) => res.send({ data: { healthStatus: 'UP' } })) // check to see if deployed app is still up and running
app.use('/api/people', peopleRouter)
app.use('/api/people', giftsRouter)
app.use('/auth', authRouter)
app.use(handleErrors)

export default app
