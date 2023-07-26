const { cartService } = require("../services/index.service")

const uploadCartItems = async ( req, res ) => {

    const body = req.body

    try {
    
        const result = await cartService.addItem( body )
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({
            message: "can't upload cartItmes to database ",
            error
        })
    }

}


const getCartItems = async ( req, res ) => {

    /*  ask frontend folk to send cartId (since cartId & cartId are the same, it is good to use cartId to fetch cartItems )*/
    const id = req.params.cartId

    try {
        const result = await cartService.getCart( id )
        res.status(201).json(result)


    } catch (error) {
        res.status(500).json({
            message: "can't fetch cartItems from database ",
            error
        })
    }

}

const patchQuantity = async ( req, res ) => {
    const body = req.body

    try {

        const result = await cartService.updateQuantity( body )
        res.status(201).json(result)
        
    } catch (error) {
        res.status(500).json({
            message: "can't update quantity in database ",
            error
        })
    }

}

const deleteCartItems = async ( req, res ) => {

    const cartId = req.params.cartId
    const cartItemsId = req.body.cartItemsId
    console.log(cartId+" hiihii "+cartItemsId);

    try{
            const result = await cartService.deleteProductFromCart( cartId, cartItemsId )
            res.json(result)
        }
    catch( error ){
        res.status(500).json({
            message: "couldn't able delete cartItems from Cart",
            error
        })
    }

} 

module.exports = {
    cartController : {
        uploadCartItems,
        getCartItems,
        patchQuantity,
        deleteCartItems
    }
}