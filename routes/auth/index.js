import User from '../../models/User.js'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import authUser from '../../middleware/authUser.js'
import ResourceNotFoundError from '../../exceptions/ResourceNotFound.js'
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
        next(error)
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

router.patch('/users/me', sanitizeBody, authUser, async (req, res, next) => {
    try {
        // retrieve the whole user object from the database (req.user?????)
        // apply the password change - set the new password property on your sanitized body
        const user = await User.findOneAndUpdate(
            req.user,
            req.sanitizedBody, 
            {
                new: true,
                overwrite: false,
                runValidators: true
            }
        )
        // then call save() on the user object
        // which will automatically fire the pre 'save' hook in the User model (only runs when password has been changed) that will encrypt the password for us automatically
        await user.save()
        if (!user) throw new ResourceNotFoundError(`We could not find the requested User information`)
        res.status(201).send({ data: user })
    } catch (error){
        next(error)
    }
})

export default router
