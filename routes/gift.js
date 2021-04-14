import Gift from '../models/Gift.js'
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

        
        let person = await Person.findById(req.params.id)
        
        let attribute = req.sanitizedBody;
        debug(attribute)
        Gift(attribute)
        .save()
        .then(newGift =>{
            person.gifts.push(newGift._id);
            person.save()} )
        .then(newGift => res.status(201).send({data: newGift}))
        .catch(next)
        
})

export default router