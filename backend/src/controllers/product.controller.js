const { productService } = require("../services/index.service")

const uploadProduct = async (req, res) => {

    const body = req.body

    try {

        const result = await productService.addProduct(body)
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({
            message: "can't upload products to database ",
            error
        })
    }

}

const getAllProducts = async (req, res) => {

    try {

        const result = await productService.getProductsList()
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({
            message: "can't fetch All the products from database ",
            error
        })
    }

}

const searchProducts = async (req, res) => {
    const videoName = req.query.value
    // console.log(videoName)

    try {
        const result = await productService.searchForProduct( videoName )
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({
            message: "can't fetch products with the name from database ",
            error
        })
    }

}


const getProduct = async (req, res) => {

    const id = req.params.productId

    try {

        const result = await productService.x(id)
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({
            message: "can't fetch product from database ",
            error
        })
    }

}

module.exports = {
    productController: {
        getAllProducts,
        uploadProduct,
        getProduct,
        searchProducts
    }
}