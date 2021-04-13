// Don't forget to use NPM to install all of the required dependencies
import morgan from 'morgan'
import express from 'express'
import connectDatabase from './startup/connectDatabase.js'
import santizeBody from './middleware/sanitizeBody.js'

connectDatabase()
const app = express()
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {})
app.post('/test', sanitizeBody, (req, res) => {})

export default app
