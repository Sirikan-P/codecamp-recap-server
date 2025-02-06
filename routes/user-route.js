//import lib..
const express = require("express")
const router = express.Router()

//import contoller..
const userController = require('../controllers/user-controller')

//import middleware
const { authCheck } = require('../middlewares/auth-middleware')

//route
//@ENDPOINT http://localhost:8000/api/users
router.get('/users',authCheck ,userController.listUsers)
router.patch('/user/update-role',authCheck, userController.updateRole)
router.delete('/user/:id',authCheck, userController.deleteUser )

//export
module.exports = router
