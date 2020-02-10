const UserModel = require('../models/user.model.js')

exports.getAll = async (req, res) => {
    const users = await UserModel.find()
    res.json(users)
}

exports.findByEmail = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.userEmail })
        if (!user) return res.status(400).send('No user found with that email address')

        res.json(user)
    } catch (err) {
        console.error(err)
        return res.status(400).send('No user found with that email address')
    }
}

exports.findById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId)
        if (!user) return res.status(400).send('No user found with that id')

        res.json(user)
    } catch (err) {
        return res.status(400).send('No user found with that id')
    }
}

exports.delete = (req, res) => {
    const userId = req.params.userId

    UserModel.findByIdAndRemove(userId)
        .then(user => {
            if (!user) return res.status(400).send(`No user found with id ${userId}`)
            res.json(user)
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound')
                return res.status(400).send(`No user found with id ${userId}`)
            res.status(500).send(`Could not delete user with id ${userId}`)
        })
}
