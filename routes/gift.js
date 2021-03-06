import sanitizeBody from '../middleware/sanitizeBody.js'
import authUser from '../middleware/authUser.js'
import ResourceNotFoundError from '../exceptions/ResourceNotFound.js'
import Gift from '../models/Gift.js'
import Person from '../models/Person.js'
import logger from '../startup/logger.js'
import express from 'express'

const log = logger.child({ module: 'Giftr:routes/gifts' })
const router = express.Router()

// ============Testing purposes==============
router.get('/:id/gifts', async (req, res) => {
    const collection = await Gift.find()
    res.send({ data: collection })
})
//============================================

router.post('/:id/gifts', sanitizeBody, authUser, async (req, res, next) => {
    let gift = new Gift(req.sanitizedBody)
    await gift.save()

    try {
        let person = await Person.findById(req.params.id)
        let giftArr = person.gifts
        giftArr.push(gift)
        person.save()
        res.status(201).send({ data: gift })
    } catch (error) {
        log.error(error)
        next(error)
    }
})

router.patch('/:id/gifts/:giftId', sanitizeBody, authUser, async (req, res, next) => {
    try {
        const { _id, ...otherAttributes } = req.sanitizedBody
        const person = await Person.findById(req.params.id)
        const gift = person.gifts.id(req.params.giftId)
        
        if (!gift) {
            throw new ResourceNotFoundError(
                `We could not find a Gift with id ${req.params.giftId}`
            )
        }
        gift.set({ _id: req.params.giftId, ...otherAttributes })
        
        await person.save()
        res.send({ data: gift })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id/gifts/:giftId', authUser, sanitizeBody, async (req, res, next) => {
    try {
        const { _id, ...otherAttributes } = req.sanitizedBody
        const person = await Person.findById(req.params.id)
        const gift = person.gifts.id(req.params.giftId)

        if (!gift) {
            throw new ResourceNotFoundError(
                `We could not find a Gift with id ${req.params.giftId}`
            )
        }
        gift.remove({ _id: req.params.giftId })
        
        await person.save()
        res.send({ data: gift })
    } catch (error) {
        next(error)
    }
    }
)

export default router
