const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { User } = require('../models/index.model')

const encryptPassword = async ( password )=>{

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash( password, salt )
    return hashedPassword
    
}

const verifyPassword = async ( password, hashedPassword ) => {

    const verify = await bcrypt.compare( password, hashedPassword )
    console.log(verify)
    return verify
}

const generateToken = ( userID , walletMoney ) => {

    const payload = {
        userID,
        walletMoney
    }

    const secret = "IamNoob"

    const options = { expiresIn : "1h" }

    console.log("--------------"+payload+"........"+secret+"........."+options )

    try {
        const token = jwt.sign( payload, secret, options )
        console.log("token------"+token);
        return token
    } catch (error) {
        throw error
    }
} 

const signUp = async (body) => {
    
    try {
        const hashedPassword = await encryptPassword( body.password )
        
        const insertUser = new User({...body, password : hashedPassword})
        
        const insertDocument = await insertUser.save()
        return insertDocument

    } catch (error) {
        throw new Error("Error at service layer")
    }

}

const login = async ( body ) => {
    const { email, password } = body

    try {
        const user = await User.findOne( {email : email} )
        console.log(user)
        
        const isLoggedIn = await verifyPassword( password, user.password )

        const token = generateToken( user._id, user.walletMoney )

        return { user, isLoggedIn , token }

    } catch (error) {
        throw error
    }
}

module.exports = {
    authService : {
        signUp,
        login
    }
}