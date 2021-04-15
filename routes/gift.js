import { Gift } from '../models/Gift.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import Person from '../models/Person.js'
import express from 'express'
const router = express.Router()
import createDebug from 'debug'
import authUser from '../middleware/authUser.js'

const debug = createDebug('Giftr:httpServer')

// Testing purposes
router.get('/:id/gifts', async (req, res) => {
    const collection = await Gift.find()
    res.send({ data: collection })
})

router.post('/:id/gifts', sanitizeBody, authUser, async (req, res , next) => {
    let gift = new Gift(req.sanitizedBody)
    await gift.save();
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
router.patch('/:id/gifts/:giftId', sanitizeBody, authUser, async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id)
        console.log(person)

        // how to access gift sub doc from person??
        const gift = person.gifts
        console.log(gift)
// gift = [1,2,3]
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
        await document.save()
        console.log("Updated gift" , document)
        console.log("req.params.id" , req.params.id)
        console.log("req.params.giftId" , req.params.giftId)
        


        //TO DO: the old array item still shows up in the person's gift array
        gift.forEach((item)=>{
            if(item.id === req.params.giftId){
                console.log("update array")
                console.log("PERSON" , person)
                
                console.log(gift.indexOf(item))
                
                //find old gift index in person array 
                let indexNum = gift.indexOf(item)
                //replace old gift with new gift 
                item[indexNum] = document
                //save person
                person.save()

                console.log("UPDATED PERSON" , person)
                console.log(item[indexNum] , "HEYYYYYYY IM AN Item INDEX NUM")
            }
        })

        if (!document) throw new Error (`We could not find a Gift with id ${req.params.giftId}`)

        res.send({ data: document })
    } catch (error) {
        // TO DO: fix
        console.log(error)
    }
})

router.delete('/:id/gifts/:giftId', authUser, async (req, res) => {
    try {
        const document = await Gift.findByIdAndRemove(req.params.giftId)
        if (!document) throw new Error(`We could not find a Person with id ${req.params.id}`)
        res.send({ data: document })
    } catch (err) {
        console.log("try again")
    }
})





export default router