const express = require('express')
const app = express()

// Connect to MongoDB
require('./db.js').connect()

// Middleware
app.use(express.json())

// Routes
app.use('/api', require('./routes/index.routes.js'))
app.use('/api/auth', require('./routes/auth.routes.js'))
require('./routes/user.routes.js')(app)

// Run the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
