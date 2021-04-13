import User from '../../models/User.js'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import authUser from '../../middleware/authUser.js'
import express from 'express'
const router = express.Router()



//================================================QUARANTINE ZONE=======================================
// router.post('/users', sanitizeBody , (req, res) => {
//     new User(req.sanitizedBody)
//     console.log("HEEYYYYYYYYY IM HERE")
//         .save()
//         .then((newUser) => res.status(201).send({ data: newUser }))
//         .catch(next)
// })

router.post('/users', sanitizeBody, async (req, res) => {
    try {
        let newUser = new User(req.sanitizedBody)
        await newUser.save()
        res.status(201).send({ data: newUser })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            errors: [
                {
                    status: '500',
                    title: 'Server error',
                    description: 'Problem saving document to the database.',
                },
            ],
        })
    }
})
//============================================QUARANTINE ZONE ENDS=======================================


router.get('/users/me', authUser, async (req, res) => {
    req.user._id
    const user = await User.findById(req.user._id)
    res.send({ data: user })
})

// Login a user and return an authentication token.
router.post('/tokens', sanitizeBody, async (req, res) => {
    const { email, password } = req.sanitizedBody
    const authenticatedUser = await User.authenticate(email, password)

    if (!authenticatedUser) {
        return res.status(401).send({
            errors: [
                {
                    status: '401',
                    title: 'Incorrect username or password',
                },
            ],
        })
    }

    res.status(201).send({
        data: { token: authenticatedUser.generateAuthToken() },
    })
})

export default router
