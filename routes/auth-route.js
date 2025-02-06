//import lib
const express = require("express")
const router = express.Router()

//import controller
const authController = require("../controllers/auth-controller")

//import validator 
const { validateWithZod ,registerSchema, loginSchema } = require("../middlewares/validators")

//import middleware
const { authCheck } = require("../middlewares/auth-middleware")


//@ENDPOINT http://localhost:8000/api/register
router.post('/register', validateWithZod(registerSchema), authController.register)
router.post('/login', validateWithZod(loginSchema),authController.login)
router.get('/currentuser', authCheck ,authController.currentUser) //verify token

//export
module.exports = router