const jwt = require('jsonwebtoken')

// Middleware to be used on routes requiring authentication
module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.sendStatus(401)

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.token = verified
    } catch (err) {
        return res.status(401).send('Bad authentication')
    }

    next()
}
