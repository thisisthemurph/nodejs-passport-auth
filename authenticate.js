const jwt = require('jsonwebtoken')
const AuthController = require('./controllers/auth.controller.js')

// Middleware to be used on routes requiring authentication
module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({
        success: false,
        msg: 'Missing token'
    })

    try {
        req.token = jwt.verify(token, process.env.TOKEN_SECRET)

        if (!AuthController.authenticateToken(token)) return res.status(401).json({
            success: false,
            msg: 'No such user'
        })
    } catch (err) {
        return res.status(418).json({ success: false, msg: 'Bad authentication' })
    }

    next()
}
