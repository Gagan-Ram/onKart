const {userService} = require('../services/index.service') 

const addUser = async ( req, res ) => {
    const user = req.body

    try {
        console.log("c1")
        const result = await userService.createUser( user )
        console.log("c2")
        res.json(result)

    } catch (error) {
        res.status(500).json({
            message: "couldn't able to create user" ,
            error
        })
    }

}

const searchById = async ( req, res ) => {

    const id = req.params.userId
    console.log(req.query)
    const q = req.query.q
    console.log(id + " "+ q)

    try{
        if(q){
            console.log("1")
            const result = await userService.getUserAddressById( id, q )
            res.json(result)
        }
        else{
            console.log("2")
            const result = await userService.getUserById( id )
            res.json(result)
        }
    }
    catch( error ){
        res.status(500).json({
            message: "couldn't able to find user by ID ",
            error
        })
    }

} 

const patchUser = async ( req, res ) => {

    const userId = req.params.userId
    const address = req.body.address

    try{
            const result = await userService.updateAddressOfUser( userId, address )
            res.json(result)
        }
    catch( error ){
        res.status(500).json({
            message: "couldn't able to find user by ID  to update Address",
            error
        })
    }

}

module.exports = {
    userController : {
        addUser ,
        searchById ,
        patchUser,
    }
}