import {Gift} from '../models/Gift.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import Person from '../models/Person.js'
import express from 'express'
const router = express.Router()
import createDebug from 'debug'

const debug = createDebug('Giftr:httpServer')

// Testing purposes
router.get('/:id/gifts', async (req, res) => {
    const collection = await Gift.find()
    res.send({ data: collection })
})

router.post('/:id/gifts', sanitizeBody, async (req, res , next) => {
    let gift = new Gift(req.sanitizedBody)
    try {
        // get person(find by id) you attach gift to,
        let person = await Person.findById(req.params.id)
        
        // then add gift id to gifts array of person
        let giftArr = person.gifts
        giftArr.push(gift)

        // save gift to person array
        person.save()
        console.log(giftArr)
        res.status(201).send({ data: gift })
    } catch (error) {
        next(error)
    }
})

// TO DO: 
router.patch('/:id/gifts/:giftId', sanitizeBody, async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id)
        console.log(person)

        // how to access gift sub doc from person??
        const gift = person.gifts
        console.log(gift)

        // update gift
        const document = await Gift.findByIdAndUpdate(
            req.params.giftId,
            req.sanitizedBody,
            {
                new: true,
                overwrite: true,
                runValidators: true,
            }
        )
        if (!document) throw new Error (`We could not find a Gift with id ${req.params.giftId}`)

        res.send({ data: document })
    } catch (error) {
        // TO DO: fix
        console.log(error)
    }
})

router.delete('/:id/gifts/:giftId', async (req, res) => {
    try {
        const document = await Gift.findByIdAndRemove(req.params.id)
        if (!document) throw new ResourceNotFound(`We could not find a Person with id ${req.params.id}`)
        res.send({ data: document })
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})





export default router