const Joi = require("joi")

const loginBodyValidationSchema = Joi.object().keys({
    email : Joi.string().required(),
    password : Joi.string().required()
})

module.exports = {
    loginBodyValidationSchema
}