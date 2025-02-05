//import lib..
const express = require("express")
const router = express.Router()

//import contoller..
const userController = require('../controllers/user-controller')

//route
//@ENDPOINT http://localhost:8000/api/users
router.get('/users', userController.listUsers)
router.patch('/user/update-role', userController.updateRole)
router.delete('/user/:id', userController.deleteUser )

//export
module.exports = router
