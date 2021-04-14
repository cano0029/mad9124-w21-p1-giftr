import { Gift } from '../models/Gift.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import Person from '../models/Person.js'
import express from 'express'
const router = express.Router()

// Testing purposes
router.get('/:id/gifts', async (req, res) => {
    const collection = await Gift.find()
    res.send({ data: collection })
})

router.post('/:id/gifts', sanitizeBody, async (req, res , next) => {
    let newDocument = new Gift(req.sanitizedBody)
    try {
        // get person(find by id) you attach gift to,
        let person = await Person.findById(req.params.id)
        let gift = newDocument
        
        // then add gift id to gifts array of person
        let giftArr = person.gifts
        giftArr.push(gift)

        // save gift to person array
        person.save()
        res.status(201).send({ data: newDocument })
    } catch (error) {
        next(error)
    }
})

export default router