const passport = require('passport')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()

const auth = require('../authenticate.js')
const UserModel = require('../models/user.model.js')

router.get('/login', auth.checkNotAuthenticated, (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', auth.checkNotAuthenticated, (req, res) => {
    res.render('register')
})

router.post('/register', auth.checkNotAuthenticated, async (req, res) => {
    const { name, email, password } = req.body
    let errors = []

    // Do some validation 
    if (!name || !email || !password) {
        errors.push({ msg: 'All fields must be complete' })
    }

    const passwordMinLength = 3
    if (password.length < passwordMinLength) {
        errors.push({ msg: `Your password must be more than ${passwordMinLength} characters in length` })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password
        })
    } else {
        const user = new UserModel({
            name: name,
            email: email,
            password: password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err

                user.password = hash
                user.save()
                    .then(user => {
                        req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                        )
                        
                        res.redirect('/user/login')
                    })
                    .catch(err => console.error(err))
            })
        })
    }
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You have been logged out')
    res.redirect('/user/login')
})

module.exports = router