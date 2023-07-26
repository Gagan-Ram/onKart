const { Cart, User, Product } = require('../models/index.model')

const addCartItems = async (cartID, product) => {

    try {

        // const user = await User.findById({ _id : userID })
        const prod = await Product(product)
        const insertProd = await prod.save()

        const updateCartItems = await Cart.findByIdAndUpdate(cartID,
            {
                $push: {
                    cartItems: {
                        product: insertProd
                    }
                }
            },
            { new: true })


        return updateCartItems

    } catch (error) {
        throw error
    }

}

const addItem = async (body) => {

    /*
    Accepts
        {
            "userId" : "",
            "productId": "",
            "email":""
        }
    
    */

    const userID = body.userId
    const productID = body.productId
    console.log(userID);
    console.log(productID);

    /* 
        if userClicks addToCart for the first time then 
            1-  create cart
            2- upload product in cart
        
        if user clicks on addToCart second time then
            1- update product into cart { push the product to cartItems }
    */

    try {

        const cartPresent = await Cart.findById({ _id: userID })
        const cartID = userID
        const product = await Product.findById({ _id: productID })

        if (cartPresent) {
            const result = await addCartItems(cartID, product)
            return result

        }
        else {
            const item = new Cart({ ...body, _id: cartID })
            const insertItem = await item.save()

            const result = await addCartItems(cartID, product)
            return result
        }


    } catch (error) {
        throw error
    }

}

const getCart = async (id) => {
    const filter = { _id: id }

    try {

        const item = await Cart.findById(filter)
        // const item = await Product.findOneById(filter)
        return item

    } catch (error) {
        throw error
    }

}

const updateQuantity = async (body) => {
    const { cartId, cartItemsId, increment, decrement } = body;
    console.log(cartId + " " + cartItemsId + " " + increment + decrement);

    let filter = {};

    if (increment) {
        filter = { $inc: { 'cartItems.$.quantity': 1 } };
    } else if (decrement) {
        filter = { $inc: { 'cartItems.$.quantity': -1 } };
    }

    try {
        const qtyUpdate = await Cart.updateOne(
            {
                _id: cartId,
                'cartItems._id': cartItemsId
            },
            filter,
            { new: true }
        );
        return qtyUpdate;
    } catch (error) {
        throw error;
    }
};


const deleteProductFromCart = async (cartId, cartItemsId) => {
    // const { cartId, cartItemsId } = body;
    console.log(cartId + " " + cartItemsId);


    try {
        const deleteCartItem = await Cart.updateOne(
            { _id: cartId },
            { $pull: { cartItems: { _id: cartItemsId } } },
            { new: true }
        );

        // const deleteCartItem = await Cart.findByIdAndDelete(cartID,
        //     {
        //         $push: {
        //             cartItems: {
        //                 product: insertProd
        //             }
        //         }
        //     },
        //     { new: true }
        // );

        return deleteCartItem;
    } catch (error) {
        throw error;
    }
};




module.exports = {
    cartService: {
        addItem,
        getCart,
        updateQuantity,
        deleteProductFromCart
    }
}