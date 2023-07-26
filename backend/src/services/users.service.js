const { User } = require('../models/index.model')

const createUser = async (user) => {

    try {
        console.log("s1")
        const insertUser = new User(user)
        console.log("s2")

        const insertDocument = await insertUser.save(insertUser)
        console.log("s3")

        return insertDocument


    } catch (error) {
        throw new Error("Couldn't  create User into database");
    }

}

const getUserById = async (userId) => {

    const id = userId
    console.log(id);

    try {

        const filter = { _id: id }
        console.log(filter)

        const findUser = await User.findById(filter)
        return findUser

    } catch (error) {
        throw new Error("No user by Id in database")
    }

}

const getUserAddressById = async (userId, q) => {
    
    const id = userId
    console.log(id);

    try {

        const filter = { _id: id }
        console.log(filter)

        const findUserAndReturnAddress = await User.findById(filter, {address :1, _id:0})
        return findUserAndReturnAddress

    } catch (error) {
        throw new Error("can't find user address in database")
    }

}

const updateAddressOfUser = async (userId, address) => {
    
    try {

        const updateUserAddress = await User.findByIdAndUpdate( userId , { address: address } , {new: true} )
        return updateUserAddress

    } catch (error) {
        throw new Error("can't update user address in database")
    }

}

module.exports = {
    userService: {
        createUser,
        getUserById,
        getUserAddressById,
        updateAddressOfUser

    }
}