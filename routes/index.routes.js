const express = require('express')
const router = express.Router()

const auth = require('../authenticate.js')

router.get('/', auth.checkAuthenticated, (req, res) => {
    res.render('index', { user: req.user })
})

module.exports = router