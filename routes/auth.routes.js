const router = require('express').Router()
const UserModel = require('../models/user.model.js')
const validation = require('../validation.js')

router.post('/register', async (req, res) => {

    // Validate the user
    const {error} = validation.registrationUserValidaion(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router