const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const UserModel = require('../models/user.model.js')
const validation = require('../validation.js')

dotenv.config()

router.post('/register', async (req, res) => {

    // Validate the user
    const {error} = validation.registrationUserValidaion(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Does the user already exist
    const emailExists = await UserModel.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('A user with that email address already exists')

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {

    // User validation
    const {error} = validation.loginUserValidaion(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Does the user exist?
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('An account with that email address does not exist')

    // Is the password correct?
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('That password is incorrect')

    // Create a JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

module.exports = router
