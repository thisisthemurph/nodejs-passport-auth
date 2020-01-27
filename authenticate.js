function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    req.flash('error_msg', 'Please log in...')
    res.redirect('/user/login')
}

function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
       return  next()
    }

    res.redirect('/')
}

module.exports = {
    checkAuthenticated: checkAuthenticated,
    checkNotAuthenticated: checkNotAuthenticated
}