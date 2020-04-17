const UserModel = require('../models/user.model.js')

/**
 * Determines if the user detailed in the token actually exists
 */
exports.authenticateToken = async (token) => {
    const payload = token.split('.')[1]
    const buff = new Buffer(payload, 'base64')
    const userPayload = JSON.parse(buff.toString('ascii'))
    const user = await UserModel.findById(userPayload._id)

    return Boolean(user)
}