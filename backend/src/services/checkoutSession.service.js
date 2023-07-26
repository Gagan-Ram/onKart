const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config(path.join(__dirname, '../../.env'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const { Cart} = require('../models/index.model')

// app.use(express.static('public'));

// const product = await getProduct(item.productId);
// console.log(item);
// items.push({
//   price_data: {
//     currency: "usd",
//     product_data: { name: product.name },
//     unit_amount: product.cost,
//   },
//   quantity: item.qty,
// });


const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

const stripePayment = async (cartId) => {
    
    
    
    // const costValue = req.body.costValue
    // console.log("costValue------------->" + costValue)
    try {
        // const storeItemzz = await cartService.getCart('64aec5c6fa604f48130c044c')
        // const storeItemzzresult= await cartService.getCart( '64aec5c6fa604f48130c044c' )
        const storeItemresult = await Cart.findById({_id:cartId})
        const items = storeItemresult.cartItems
        console.log("storeItemresult--------->"+items)
        
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item => {
                // const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.product.name
                        },
                        unit_amount: item.product.cost
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${YOUR_DOMAIN}/thankyou`,
            cancel_url: `${YOUR_DOMAIN}/checkout`
        });
        console.log(session.url)
        return session.url;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    checkoutSessionService: {
        stripePayment
    }
}