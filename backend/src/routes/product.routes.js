const router = require("express").Router()

const { productController } = require("../controllers/product.controller")

router.get("/", productController.getAllProducts )

router.get("/search", productController.searchProducts )

router.get("/:productId", productController.getProduct )

router.post("/", productController.uploadProduct )

module.exports = router