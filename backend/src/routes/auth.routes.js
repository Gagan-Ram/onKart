const router = require("express").Router()

const {authController} = require("../controllers/index.controllers")

const { signUpValidation } = require("../validations/users.validator")
const { loginBodyValidationSchema } = require("../validations/auth.validator")

const { validateSignUp, validateLogin } = require("../middlewares/auth.middleware")

const  validateUserSignUp = validateSignUp(signUpValidation)
const  validateUserLogin = validateLogin(loginBodyValidationSchema)

router.post("/signUp",validateUserSignUp, authController.postSignup )

router.post("/login",validateUserLogin, authController.postLogin )

module.exports = router