import { Gift } from '../models/Gift.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import Person from '../models/Person.js'
import express from 'express'
const router = express.Router()


router.get('/', async (req, res) => {
    const collection = await Gift.find()
    res.send({ data: collection })
})

router.post('/', sanitizeBody, async (req, res , next) => {
    let newDocument = new Gift(req.sanitizedBody)
    // let person = new Person 
    // push to array?
    // save to parent document (Person)?
    try {
        // person.children.push(newDocument)
        let giftOwner = await Person.findById(req.params.id)
        console.log("I AM A REAL BOY" , giftOwner)
        await newDocument.save()
        let gift = await  Gift.findById(req.params.id)
        console.log(`GIFT: ${gift}`)
        let giftArr = giftOwner.gifts
        console.log(`GIFT ARR: ${giftArr}`)
        giftArr.push(gift)
        
        //...get person(find by id) you attach gift to,
        // save gift
        // then add gift id to gifts array of person 
        res.status(201).send({ data: newDocument })
    } catch (error) {
        next(error)
    }
})

export default router
