import sanitizeBody from '../middleware/sanitizeBody.js'
import authUser from '../middleware/authUser.js'
import ResourceNotFoundError from '../exceptions/ResourceNotFound.js'
import Person from '../models/Person.js'
import logger from '../startup/logger.js'
import express from 'express'
import mongoose from 'mongoose'
import { GiftSchema } from '../models/Gift.js'

const log = logger.child({ module: 'Giftr:routes/person' })
const router = express.Router()

const validateId = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        if (await Person.countDocuments({ _id: id })) return true
    }
    throw new ResourceNotFoundError(`We could not find a Person with id ${id}`)
}

router.get('/', authUser, async (req, res) => {
    const collection = await Person.find({ owner: req.user._id }).select('-gifts')
    res.send({ data: collection })
})

router.post('/', sanitizeBody, authUser, async (req, res, next) => {
    let newPerson = new Person(req.sanitizedBody)
    try {
        newPerson.owner = req.user._id
        await newPerson.save()
        res.status(201).send({ data: newPerson })
    } catch (error) {
        log.error(error)
        next(error)
    }
})

router.get('/:id', authUser, async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id).populate('owner')
        res.send({ data: person })

        if (!person) {
            throw new ResourceNotFoundError(
                `We could not find a Person with the id ${req.params.id}`
            )
        }
    } catch (err) {
        log.error(err)
        next(err)
    }
})

const update = (overwrite = false) => async (req, res, next) => {
    try {
        const updatePerson = await Person.findByIdAndUpdate(
            req.params.id,
            req.sanitizedBody,
            {
                new: true,
                overwrite,
                runValidators: true,
            }
        )

        if (!updatePerson)
            throw new ResourceNotFoundError(
                `We could not find a Person with the id ${req.params.id}`
            )
            updatePerson.owner = req.user._id
        await updatePerson.save()
        res.send({ data: updatePerson })
    } catch (err) {
        next(err)
    }
}
router.put('/:id', sanitizeBody, authUser, update(true))
router.patch('/:id', sanitizeBody, authUser, update(false))

router.delete('/:id', authUser, async (req, res, next) => {
    try {
        await validateId(req.params.id)
        const person = await Person.findByIdAndRemove(req.params.id)
        
        if (!person)
            throw new ResourceNotFoundError(
                `We could not find a Person with the id ${req.params.id}`
            )
        res.send({ data: person })
    } catch (err) {
        next(err)
    }
})

export default router
