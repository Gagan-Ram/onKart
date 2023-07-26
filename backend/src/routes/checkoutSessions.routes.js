const router = require("express").Router()

const { checkoutSessionContoller } = require("../controllers/index.controllers")

router.post('/', checkoutSessionContoller.payment)

module.exports = router