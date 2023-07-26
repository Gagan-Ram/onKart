const router = require("express").Router()

const authRoute = require("./auth.routes")

const userRoute = require("./users.routes")

const productRoute = require("./product.routes")

const cartRoute = require("./cart.routes")

const checkoutSessions = require("./checkoutSessions.routes")

router.use("/auth", authRoute )

router.use("/users", userRoute )

router.use("/product", productRoute )

router.use("/cart", cartRoute )

router.use("/checkout/sessions", checkoutSessions )

module.exports = router