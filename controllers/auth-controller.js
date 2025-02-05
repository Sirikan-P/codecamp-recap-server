exports.register = (req,res,next)=>{

    try {
        res.json({message:"hello register"})
    } catch (err) {
        next(err)
    }
}

exports.login = (req,res,next)=>{
    try {
        console.log(xxx)
        res.json({message:"Hello login"})
    } catch (err) {
        next(err)
    }
}