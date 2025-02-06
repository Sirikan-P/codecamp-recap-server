//1:: list all user
//2:: update role
//3:: delete user 
const prisma = require("../configs/prisma")


exports.listUsers= async (req,res,next)=>{
    try {
            //console.log(req.user)

        const users = await prisma.profile.findMany({
            omit : {
                password: true 
            }
        }           
        )
            //console.log(users)
        res.json({ result : users})
    } catch (error) {
        next(error)
    }
}

exports.updateRole= async(req,res,next)=>{
    try {
        const {id, role } = req.body
            //console.log(id,role)
        const updated = await prisma.profile.update({
            where:{
                id: Number(id)                
            },
            data: {
                role: role , 
            }
        })

        res.json({message: "update success"})
    } catch (error) {
        next(error)
    }
}

exports.deleteUser= async(req,res,next)=> {
    try {
        
        const {id} = req.params
        
        const deleted = await prisma.profile.delete({
            where: {
                id: Number(id)
            }
        })
        
        res.json({message: "delete success"})
    } catch (error) {
        next(error)
    }
}