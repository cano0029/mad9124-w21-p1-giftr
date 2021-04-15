// import createDebug from 'debug'
import sanitizeBody from '../middleware/sanitizeBody.js'
import authUser from '../middleware/authUser.js'
import ResourceNotFoundError from '../exceptions/ResourceNotFound.js'
import Person from '../models/Person.js'
import express from 'express'
// import User from '../models/User.js'
// const debug = createDebug('Giftr:routes/person')
const router = express.Router()

router.get('/', async (req, res) => {
    const collection = await Person.find()
    res.send({ data: collection })
    // TO DO: how to only show the person created by that User??
    // TO DO: Resource list requests should return an array of the primary resource objects only, 
    // without populating any related objects.
})

router.post('/', sanitizeBody, authUser, async (req, res , next) => {
    let newDocument = new Person(req.sanitizedBody)
    console.log('HELLO I AM THE OWNER:',req.user._id)
    try {
        // setting owner to user Id 
        newDocument.owner = req.user._id
        await newDocument.save()
        res.status(201).send({ data: newDocument })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const document = await Person.findById(req.params.id)
        .populate('gifts')
        .populate('owner')
        res.send({ data: document }) 
        if (!document) {
            throw new ResourceNotFoundError(`We could not find a Person with id ${req.params.id}`)
        }
    } catch (err) {
        next(err)
    }
})

//using this for put and patch
const update = (overwrite = false) => async (req, res, next) => {
    try {
        const document = await Person.findByIdAndUpdate(
            req.params.id,
            req.sanitizedBody,
            {
                new: true,
                overwrite,
                runValidators: true,
            }
        )
        if (!document) throw new ResourceNotFoundError(`We could not find a Person with id ${req.params.id}`)
        res.send({ data: document })
    } catch (err) {
        next(err)
    }
}
router.put('/:id', sanitizeBody, authUser, update(true))
router.patch('/:id', sanitizeBody, authUser, update(false))

router.delete('/:id', authUser, async (req, res, next) => {
    try {
        const document = await Person.findByIdAndRemove(req.params.id)
        if (!document) throw new ResourceNotFoundError(`We could not find a Person with id ${req.params.id}`)
        res.send({ data: document })
    } catch (err) {
        next(err)
    }
})

export default router
