const UserModel = require('../models/user.model.js')

exports.findUserByEmail = (email, resolve, reject) => {
    UserModel.findOne({ email: email })
        .then(user => {
            console.log('finding user')
            return resolve(user)
        })

        .catch(err => {
            return reject(err)
        })
}

exports.findUserById = (id, resolve, reject) => {
    UserModel.findById(id)
        .then(user => {
            return resolve(user)
        })

        .catch(err => {
            return reject(err)
        })
}