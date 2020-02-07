const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller.js')

router.get('/', async (req, res) => {
    const users = await UserController.getAll()
    res.json(users)
})

router.get('/:userId', async (req, res) => {
    const user = await UserController.findById(req.params.userId)

    if (user) {
        res.json(user)
    } else {
        res.send('There is no user with that ID')
    }
})

router.get('/email/:userEmail', async (req, res) => {
    const user = await UserController.findByEmail(req.params.userEmail)

    if (user) {
        res.json(user)
    } else {
        res.send('There is no user with that email address')
    }
})

router.delete('/:userId', (req, res) => {
    UserController.delete(
        req.params.userId,
        user => res.send('The user has been deleted'), 
        err => res.send(err)
    )
})

module.exports = router