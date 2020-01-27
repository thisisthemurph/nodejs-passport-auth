if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
// const expressLayouts = require('express-ejs-layouts');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const app = express()

// Passport configuratioon
require('./config/passport-config.js')(passport)

// Connect to MongoDB
require('./db.js').connect()

// EJS
// app.use(expressLayouts)
app.set('view engine', 'ejs')

// Express body parser
app.use(express.urlencoded({ extended: false }))

// Express
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/index.routes.js'))
app.use('/user', require('./routes/user.routes.js'))

// Run the server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})