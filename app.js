if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

// Connect to MongoDB
require('./db.js').connect()

// Routes
app.use('/', require('./routes/index.routes.js'))
app.use('/user', require('./routes/user.routes.js'))

// Run the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})