//1:: list all user
//2:: update role
//3:: delete user 


exports.listUsers= async (req,res,next)=>{
    try {
        
        res.json({message: "hello, List user"})
    } catch (error) {
        next(error)
    }
}

exports.updateRole= async(req,res,next)=>{
    try {
        
        res.json({message: "hello, update user Role"})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser= async(req,res,next)=> {
    try {

        res.json({message: "hello, delete user"})
    } catch (error) {
        next(error)
    }
}