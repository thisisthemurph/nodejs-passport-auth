const jwt = require('jasonwebtoken')

// Middleware to be used on routes requiring authentication
module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) req.status(401).send('Access denied!')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}