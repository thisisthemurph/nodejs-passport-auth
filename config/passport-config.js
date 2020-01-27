const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const UserModel = require('../models/user.model.js')

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            UserModel.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'No such email exists' })
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })

                .catch(err => {
                    return done(null, false, { message: 'There is no user with that email address' })
                })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            done(err, user)
        })
    })
}