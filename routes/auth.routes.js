const router = require('express').Router()
const bcrypt = require('bcryptjs')
const UserModel = require('../models/user.model.js')
const validation = require('../validation.js')

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

module.exports = router