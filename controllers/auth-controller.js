const prisma = require("../configs/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")

exports.register = async (req,res,next)=>{

    try {

        //register step --------------------
        // step 1 :: req.body
        // step 2 :: validate
        // step 3 :: check already
        // step 4 :: encrypt bcrypt
        // step 5 :: insert to DB
        // step 6 :: response
        //----------------------------------

        // step 1 :: req.body
        const { email , firstname , lastname, password , confirmPassword } = req.body

        // step 2 :: validate


        // step 3 :: check already exist
        const checkEmail = await prisma.profile.findFirst({
            where: {
                email: email,
            }
        })

        if(checkEmail){
            return createError(400,"email is already exist")
        }

        // step 4 :: encrypt bcrypt password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        console.log(hashedPassword)

        // step 5 :: insert to DB
        const profile = await prisma.profile.create({
            data:{
                email : email ,
                firstname : firstname,
                lastname: lastname ,
                password: hashedPassword 
            }
        })
        
        // step 6 :: response
        res.json({message:`hello ${ firstname } ... register complete`})
    } catch (err) {
        console.log("stop 2 catch")
        next(err)
    }
}

exports.login = (req,res,next)=>{
    try {
        //console.log(xxx)
        res.json({message:"Hello login"})
    } catch (err) {
        next(err)
    }
}