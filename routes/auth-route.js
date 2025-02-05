//import lib
const express = require("express")
const router = express.Router()

//import controller
const authController = require("../controllers/auth-controller")

//@ENDPOINT http://localhost:8000/api/register
router.post('/register' ,authController.register)
router.post('/login', authController.login)

//export
module.exports = router