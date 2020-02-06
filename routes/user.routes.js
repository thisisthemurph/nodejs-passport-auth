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

module.exports = router