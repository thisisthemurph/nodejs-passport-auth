const express = require('express')
const app = express()

// Connect to MongoDB
require('./db.js').connect()

// Middleware
app.use(express.json())

// Routes
app.use('/api', require('./routes/index.routes.js'))
app.use('/api/auth', require('./routes/auth.routes.js'))

app.use('/api/user', require('./authenticate.js'))
require('./routes/user.routes.js')(app)

module.exports = app
