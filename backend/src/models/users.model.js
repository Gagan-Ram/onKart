const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim : true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim : true,
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

    password: {
        type: String,
        required: true,
        trim : true,
        min: 8,
        // validate: {
        //     validator : function(password){

        //     }
        // }
    },

    address: {
        type: String,
        default: "ADDRESS_NOT_SET"
    },

    walletMoney: {
        type: Number,
        default: 5000,
        required: true
    }


});

// userSchema.pre('save', function (next) {
//     this.email = this.email.toLowerCase();
//     next();
// });

const User = mongoose.model('users', userSchema);

module.exports = User;