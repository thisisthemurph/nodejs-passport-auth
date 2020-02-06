const express = require('express')
const app = express()

// Connect to MongoDB
require('./db.js').connect()

// Middleware
app.use(express.json())

// Routes
app.use('/api', require('./routes/index.routes.js'))
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/user', require('./routes/user.routes.js'))

// Run the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})