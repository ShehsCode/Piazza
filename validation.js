const joi = require('joi')
const registerValidation = (data) => {
    const userValidation = joi.object({
        username: joi.string().required().min(3).max(50),
        email: joi.string().required().min(10).max(256).email(),
        password: joi.string().required().min(10).max(512)
    })
    return userValidation.validate(data)
}

const loginValidation = (data) => {
    const userValidation = joi.object({
        username: joi.string().required().min(3).max(50),
        email: joi.string().required().min(10).max(256).email(),
        password: joi.string().required().min(10).max(512)
    })
    return userValidation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation