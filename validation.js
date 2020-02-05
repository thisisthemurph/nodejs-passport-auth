const Joi = require('@hapi/joi')

// Registration user validation
const registrationUserValidaion = user => {
    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .max(255)
            .required(),
        email: Joi.string()
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
    })

    return schema.validate(user)
}

// Login user validation
const loginUserValidaion = user => {
    const schema = Joi.object({
        email: Joi.string()
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
    })

    return schema.validate(user)
}

module.exports = {
    registrationUserValidaion: registrationUserValidaion,
    loginUserValidaion: loginUserValidaion
}