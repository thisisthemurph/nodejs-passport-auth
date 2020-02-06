const UserModel = require('../models/user.model.js')

exports.getAll = async () => {
    return await UserModel.find()
}

exports.findByEmail = async email => {
    // UserModel.findOne({ email: email })
    //     .then(user => {
    //         console.log('finding user')
    //         return resolve(user)
    //     })

    //     .catch(err => {
    //         return reject(err)
    //     })

    try {
        return await UserModel.findOne({ email: email })
    } catch (err) {
        return null
    }
}

exports.findById = async id => {
    try {
        return await UserModel.findById(id)
    } catch (err) {
        return null
    }
}