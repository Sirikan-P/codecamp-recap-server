//import lib ...
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//import router ...
const authRouter = require("./routes/auth-route")
const userRouter = require("./routes/user-route")

//import handle error ...
const handleErrors = require("./middlewares/error")

//app
const app = express()

//Middlewares
app.use(cors()) // Allows cross domain front/back
app.use(morgan("dev")) //Show log terminal
app.use(express.json()) // read json 

//routing(
app.use("/api",authRouter)
app.use('/api',userRouter)

//handle error
app.use(handleErrors) 
//start server
const PORT = 8000
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))