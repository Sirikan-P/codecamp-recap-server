const createError = require("../utils/createError")

exports.register = (req,res,next)=>{

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
        if(!email){
            return createError(400,"Email is required")
        }
        if(!firstname){
            return createError(400,"Firstname is required")
        }

        res.json({message:"hello register"})
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