const Joi = require("joi")

const signUpValidation = Joi.object().keys(
    {
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),

        password: Joi.string()
            .alphanum()
            .min(8)
            .required(),

        address: Joi.string()
            .default("Address_Not_set"),

    }
)


module.exports = {
    signUpValidation
}