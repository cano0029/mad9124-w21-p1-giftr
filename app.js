// Don't forget to use NPM to install all of the required dependencies
import morgan from 'morgan'
import express from 'express'
import connectDatabase from './startup/connectDatabase.js'
import sanitizeMongo from 'express-mongo-sanitize'
import peopleRouter from './routes/person.js'



connectDatabase()
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())

app.use('/api/people', peopleRouter)


export default app
