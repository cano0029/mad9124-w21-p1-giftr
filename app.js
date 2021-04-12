// Don't forget to use NPM to install all of the required dependencies
import morgan from 'morgan'
import express from 'express'
import connectDatabase from './startup/connectDatabase.js'

connectDatabase()
const app = express()
app.use(morgan('tiny'))
app.use(express.json())

export default app
