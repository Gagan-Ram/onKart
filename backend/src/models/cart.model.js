const mongoose = require('mongoose')

const {productSchema}  = require("./product.model")

const cartSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: {
            validator: function(email) {
              // Email format validation using regex
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(email);
            },
            message: 'Invalid email format'
          }
    },

    cartItems :
        [
            {
                product : productSchema,
                quantity : {
                    type: Number,
                    default : 1
                } 
            }
        ]
    ,

    paymentOption : {
        type: String,
        default : "PAYMENT_OPTION_DEFAULT"
    }


});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;