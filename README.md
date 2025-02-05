## step 1 install package json...
```bash
npm init -y
```
create file index.js

## step 2 install library ...
```bash
npm install express cors nodemon morgan dotenv bcryptjs  jsonwebtoken zod
npx prisma init -y
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
### -- and use in index.js
```JS
//import router ...
const authRouter = require("./routes/auth-route")

//routing(
app.use("/api",authRouter)

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

### -- and use in index.js
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

### when update code in GITHUB
```bash
git add .
git commit -m "message"
git push
```
when clone add . after link to extract file clone 

## Step 8 authen  
controller

#### --step 8.1 request body
postman sent body 
```JS
const { email , firstname , lastname, password , confirmPassword } = req.body
```
#### --step 8.2 validate
//middlewares/validators.js
```JS
const { z } = require("zod")

exports.registerSchema = z.object({
    email: z.string().email("check email format"),
    firstname: z.string().min(3, "firstname more than 3 characters"),
    lastname: z.string().min(3, "Lastname more than 3 characters"),
    password: z.string().min(6, "password at least 6 characters"),
    confirmPassword: z.string().min(6, "confirm password at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "confirm password incorrect",
    path: ['confirmPassword']
})

exports.loginSchema = z.object({
    email: z.string().email("check email format"),
    password: z.string().min(6, "password at least 6 characters"),

})

exports.validateWithZod = (schema) => (req, res, next) => {
    try {
        console.log('hello middleware')
        schema.parse(req.body) // call 
        next() //*** next step controller */
    } catch (error) {
        //console.log(error.errors[1].message)
        //prepare error
        const errMsg = error.errors.map((el) => el.message)
        const errTxt = errMsg.join(",")
        const mergeError = new Error(errTxt)
        next(mergeError)
    }
}
```
and then update code auth-route.js
```JS
//import validator 
const { validateWithZod ,registerSchema, loginSchema } = require("../middlewares/validators")

//@ENDPOINT http://localhost:8000/api/register
router.post('/register', validateWithZod(registerSchema), authController.register)
router.post('/login', validateWithZod(loginSchema),authController.login)

```
#### --step 8.3 check already exist
/schema.prisma 
```bash
npx prisma db push
npx prisma migrate dev --name init
```

config/prisma.js
```JS
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = prisma
```

controllers/auth-contollers.js
```JS
        // step 3 :: check already exist
        const checkEmail = await prisma.profile.findFirst({
            where: {
                email: email,
            }
        })

```


#### --step 8.4 encrypt bcrypt password
```JS
const bcrypt = require("bcryptjs")
```
```JS
        // step 4 :: encrypt bcrypt
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        console.log(hashedPassword)
```

#### --step 8.5 insert to DB
```JS
        const profile = await prisma.profile.create({
            data:{
                email : email ,
                firstname : firstname,
                lastname: lastname ,
                password: hashedPassword 
            }
        })

```

#### --step 8.6 response
```JS
res.json({message:`hello ${ firstname } ... register complete`})
```

## Step 9 login 
#### --step 9.1 req.body
```JS
const { email, password } = req.body
```
#### --step 9.2  validate email and password
```JS
        const profile = await prisma.profile.findFirst({
            where: {
                email:email 
            }
        }) //--profile is obj  console.log(profile)
        if(!profile) {
            return createError(400,"email or password is invalid")
        }

        const isMatch = bcrypt.compareSync( password , profile.password )
        // -- isMatch is booleen  console.log(isMatch) 
        if(!isMatch){
            return createError(400,"email or password is invalid")
        }
```
#### --step 9.3 generate token
```JS
const jwt = require("jsonwebtoken")
```
ENV file
```JS
SECRET = cc19
```
```JS
        // --create object without password
        const payload = {
            id:profile.id,
            email:profile.email,
            firstname:profile.firstname,
            lastname:profile.lastname,
            role:profile.role
        }
        // --create token
        const token = jwt.sign(payload,process.env.SECRET, {
            expiresIn: "1d"
        })

```
#### --step 9.4 response to front
```JS
        res.json({
            message:"Login success",
            payload:payload,
            token: token })


```
