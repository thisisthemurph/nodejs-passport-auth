const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the user-auth API! home page' })
})

module.exports = router