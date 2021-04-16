// Don't forget to use NPM to install all of the required dependencies
import morgan from 'morgan'
import express from 'express'
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
app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())

app.use('/api/people', peopleRouter)
app.use('/api/people', giftsRouter)
app.use('/auth', authRouter)
app.use(handleErrors)


export default app
