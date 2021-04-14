import { Gift } from '../models/Gift.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import Person from '../models/Person.js'
import express from 'express'
const router = express.Router()
// import {Model} from '../models/Gift.js'

// Testing purposes
router.get('/', async (req, res) => {
    const collection = await Gift.find()
    res.send({ data: collection })
})

router.post('/', sanitizeBody, async (req, res , next) => {
    let newDocument = new Gift(req.sanitizedBody)
    let person = new Person
    // push to array?
    // save to parent document (Person)?
    try {
        // person.children.push(newDocument)
        await newDocument.save()
        res.status(201).send({ data: newDocument })
    } catch (error) {
        next(error)
    }
})

export default router
