const router = require("express").Router()

const {userController} = require("../controllers/index.controllers")

router.post("/", userController.addUser ) 

router.get("/:userId", userController.searchById )

router.get("/:userId?q=address", userController.searchById )

router.patch("/:userId", userController.patchUser )

module.exports = router