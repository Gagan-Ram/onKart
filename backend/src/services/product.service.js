const { Product } = require('../models/index.model')

const addProduct = async (body) => {

    try {

        const item = new Product(body)
        const insertItem = await item.save()
        return insertItem

    } catch (error) {
        throw error
    }

}


const getProductsList = async () => {

    try {

        const filter = {}

        const itemsList = await Product.find(filter)
        return itemsList

    } catch (error) {
        throw error
    }

}


const getProduct = async (productId) => {

    const id = productId

    try {

        const filter = { _id: id }
        console.log(filter)

        const item = await Product.findById(filter)
        // const findUser = await User.findById(filter)
        // const item = await Product.findOneById(filter)
        return item

    } catch (error) {
        throw error
    }

}

const searchForProduct = async (videoName) => {
    const name = videoName;

    try {

        const filter = {
            name: {
                $regex: name,
                $options: 'i'
            }
        }

        const item = await Product.find(filter)
        return item

    } catch (error) {
        throw error
    }
}

module.exports = {
    productService: {
        getProductsList,
        addProduct,
        getProduct,
        searchForProduct
    }
}