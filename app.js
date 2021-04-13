// Don't forget to use NPM to install all of the required dependencies
import morgan from 'morgan'
import express from 'express'
import connectDatabase from './startup/connectDatabase.js'
import sanitizeBody from './middleware/sanitizeBody.js'
import sanitizeMongo from "express-mongo-sanitize"

connectDatabase()
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())

app.get('/', (req, res) => {})
app.post('/api/people', sanitizeBody, (req, res) => {
  res.status(201).send(req.sanitizedBody)
})

export default app
