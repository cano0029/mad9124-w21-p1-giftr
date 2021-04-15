import User from '../../models/User.js'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import authUser from '../../middleware/authUser.js'
import express from 'express'
const router = express.Router()

//================================================QUARANTINE ZONE=======================================
// router.post('/users', sanitizeBody , (req, res) => {
//     new User(req.sanitizedBody)
//         .save()
//         .then((newUser) => res.status(201).send({ data: newUser }))
//         .catch(next)
// })

router.post('/users', sanitizeBody, async (req, res , next) => {

    let newUser = new User(req.sanitizedBody)
    try {
        await newUser.save()
        res.status(201).send({ data: newUser })
    } catch (error){
        // TO DO: fix error handling middleware
        next(error)
    }
})
//============================================QUARANTINE ZONE ENDS=======================================


router.get('/users/me', authUser, async (req, res) => {
    req.user._id
    console.log(req.user._id)
    const user = await User.findById(req.user._id)
    res.send({ data: user })
})

// ========================================= PATCH QUARANTINE ZONE ==============================================
router.patch('/users/me' , authUser, async (req, res)=>{

    let userId = req.user._id

    console.log(userId)
    console.log("hello lets do some updating")

        const document = await User.findByIdAndUpdate(
            userId,
            req.sanitizedBody,
            {
                new: true,
                overwrite: true,
                runValidators: true,
            }
        )
        console.log(document)
        console.log("hey its the end of the function")
        document.save();
})
// ========================================= PATCH QUARANTINE ZONE ENDS==============================================


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

router.patch('/users/me', authUser, async (req, res) => {
    // TO DO: update password
})

export default router
