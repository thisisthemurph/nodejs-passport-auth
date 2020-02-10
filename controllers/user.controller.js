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
    UserModel.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) return req.status(400).send(`No user found with id ${id}`)
            req.json(user)
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound')
                return req.status(400).send(`No user found with id ${id}`)
            req.status(500).send(`Could not delete user with id ${id}`)
        })
}
