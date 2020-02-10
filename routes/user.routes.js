module.exports = app => {
    const UserController = require('../controllers/user.controller.js')

    app.route('/api/user')
        .get(UserController.getAll)

    app.route('/api/user/:userId')
        .get(UserController.findById)
        .delete(UserController.delete)

    app.route('/api/user/email/:userEmail')
        .get(UserController.findByEmail)
}
