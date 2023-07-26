const router = require("express").Router()

const { cartController } = require("../controllers/index.controllers")

router.get("/:cartId", cartController.getCartItems )

router.post("/", cartController.uploadCartItems )

router.patch("/", cartController.patchQuantity )

router.delete("/:cartId", cartController.deleteCartItems )

module.exports = router