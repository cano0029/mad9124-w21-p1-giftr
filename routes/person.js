import createDebug from 'debug'
import sanitizeBody from '../middleware/sanitizeBody.js'
import ResourceNotFound from '../exceptions/ResourceNotFound.js'
import checkPermissions from '../middleware/checkPermissions.js'
import Person from '../models/Person.js'
import express from 'express'
const debug = createDebug('Giftr:routes/person')
const router = express.Router()

router.get('/', async (req, res) => {
    const collection = await Person.find()
    res.send({ data: collection })
})

router.post('/', sanitizeBody, async (req, res , next) => {
    let newDocument = new Person(req.sanitizedBody)
    try {
        await newDocument.save()
        res.status(201).send({ data: newDocument })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const document = await Person.findById(req.params.id).populate('gifts')
        if (!document) throw new ResourceNotFound(`We could not find a Person with id ${req.params.id}`)

        res.send({ data: document })
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})

//using this for put and patch
const update = (overwrite = false) => async (req, res) => {
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
        if (!document) throw new ResourceNotFound(`We could not find a Person with id ${req.params.id}`)
        res.send({ data: document })
    } catch (err) {
        sendResourceNotFound(req, res)
    }
}
router.put('/:id', sanitizeBody, update(true))
router.patch('/:id', sanitizeBody, update(false))

router.delete('/:id', checkPermissions, async (req, res) => {
    try {
        const document = await Person.findByIdAndRemove(req.params.id)
        if (!document) throw new ResourceNotFound(`We could not find a Person with id ${req.params.id}`)
        res.send({ data: document })
    } catch (err) {
        sendResourceNotFound(req, res)
    }
})

function sendResourceNotFound(req, res) {
    res.status(404).send({
        error: [
            {
                status: '404',
                title: 'Resource does not exist',
                description: `We could not find a person with id: ${req.params.id}`,
            },
        ],
    })
}

export default router
