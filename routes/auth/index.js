import User from '../../models/User.js'
import sanitizeBody from '../../middleware/sanitizeBody.js'
import authUser from '../../middleware/authUser.js'
import ResourceNotFoundError from '../../exceptions/ResourceNotFound.js'
import express from 'express'

const router = express.Router()

router.post('/users', sanitizeBody, async (req, res, next) => {
    let newUser = new User(req.sanitizedBody)
    try {
        await newUser.save()
        res.status(201).send({ data: newUser })
    } catch (error) {
        next(error)
    }
})

router.get('/users/me', authUser, async (req, res) => {
    req.user._id
    const user = await User.findById(req.user._id)
    res.send({ data: user })
})

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
        const user = await User.findOneAndUpdate(req.user, req.sanitizedBody, {
            new: true,
            overwrite: false,
            runValidators: true,
        })
        await user.save()
        if (!user)
            throw new ResourceNotFoundError(
                `We could not find the requested User information`
            )
        res.status(201).send({ data: user })
    } catch (error) {
        next(error)
    }
})

export default router
