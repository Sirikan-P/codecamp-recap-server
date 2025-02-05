//import lib
const express = require("express")
const router = express.Router()

//import controller
const authController = require("../controllers/auth-controller")

//import validator 
const { validateWithZod ,registerSchema, loginSchema } = require("../middlewares/validators")



//@ENDPOINT http://localhost:8000/api/register
router.post('/register', validateWithZod(registerSchema), authController.register)
router.post('/login', validateWithZod(loginSchema),authController.login)

//export
module.exports = router