const express = require('express')
const app = express()

// Connect to MongoDB
require('./db.js').connect()

// Middleware
app.use(express.json())

// Allow cross origin CORS for testing
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token")
	next();
});

// Routes
app.use('/api', require('./routes/index.routes.js'))
app.use('/api/auth', require('./routes/auth.routes.js'))

app.use('/api/user', require('./authenticate.js'))
require('./routes/user.routes.js')(app)

module.exports = app
