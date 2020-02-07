const UserModel = require('../models/user.model.js')

exports.getAll = async () => {
    return await UserModel.find()
}

exports.findByEmail = async email => {
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

exports.delete = (id, success, fail) => {
    UserModel.findByIdAndRemove(id)
        .then(user => {
            if (!user) return fail(`No user found with id ${id}`)
            return success(user)
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound')
                return fail(`No user found with id ${id}`)
            return fail(`Could not delete user with id ${id}`)
        })
}