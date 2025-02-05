## step 1 install package json...
```bash
npm init -y
```
create file index.js

## step 2 install library ...
```bash
npm install express cors nodemon morgan dotenv bcryptjs  jsonwebtoken
npx prisma init
```

## step 3 Git ...
create repo
```bash
git init
git add .
git commit -m "message"
```

copy code form repo only first time : 
```bash
git remote add origin 
git branch -M main
git push -u origin main
```

when update code
```bash
git add .
git commit -m "message"
git push
```
## step 4 edit package.json
```bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "nodemon index.js"
  }
```
## Step 5 use middlewares
update code index.js
```JS
//import lib ...
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
//app
const app = express()

//start server
const PORT = 8000
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))
```
## Step 6 router folder & controller folder
/controllers/auth-controller.js

```JS
exports.register = (req,res,next)=>{

    try {
        res.json({message:"hello register"})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:"server error"})
    }
}
```
/routes/auth-route.js
```JS
//import lib
const express = require("express")
const router = express.Router()

//import controller
const authController = require("../controllers/auth-controller")

//@ENDPOINT http://localhost:8000/api/register
router.post('/register' ,authController.register)

//export
module.exports = router
```
test code by postman 

## Step 7 controller handle error 
/middlewares/error.js

```js
const handleErrors = (err,req,res,next)=>{

    res
    .status( err.statusCode || 500)
    .json({ message: err.message || "Something wrong" })

}

module.exports = handleErrors
```

and use in index.js
```js
//import handle error ...
const handleErrors = require("./middlewares/error")

//handle error
app.use(handleErrors) 
```
and change in try_catch
```js
    try {
        console.log(xxx)
        res.json({message:"Hello login"})
    } catch (err) {
        next(err)
    }
```