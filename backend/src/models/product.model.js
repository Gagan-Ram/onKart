const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    category :{
        type: String,
        required: true
    },

    cost  :{
        type: Number,
        required: true
    },

    rating :{
        type: Number,
        required: true
    },

    image :{
        type: String,
        required: true
    },

})

const Product = mongoose.model('products', productSchema);

module.exports = {
    Product,
    productSchema
};



