const { checkoutSessionService } = require("../services/index.service")

const payment = async (req, res) => {
    const cartId = req.body.cartId

    try {

        const result = await checkoutSessionService.stripePayment(cartId)
        res.status(201).json({ "url": result })

    } catch (error) {
        res.status(500).json({
            message: "In controllers, payment process error",
            error
        })
    }
}

module.exports = {
    checkoutSessionContoller: {
        payment
    }
}