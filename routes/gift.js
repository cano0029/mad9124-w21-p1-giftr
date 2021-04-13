import Person from '../models/Person.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import express from 'express'
const router = express.Router()
import {Model} from '../models/Gift.js'


router.post('/', sanitizeBody, async (req, res , next) => {
    let newDocument = new Model(req.sanitizedBody)
    // push to array?
    // save to parent document (Person)?
    try {
        await newDocument.save()
        res.status(201).send({ data: newDocument })
    } catch (error) {
        next(error)
    }
})

export default router
