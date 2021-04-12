// Don't forget to use NPM to install all of the required dependencies
import morgan from 'morgan'
import express from 'express'
const app = express();

app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => res.send('Hello'))

export default app