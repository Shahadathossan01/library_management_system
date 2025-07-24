const error = require("../utils/error")
const tokenService=require('../lib/token')
const userService=require('../lib/user')
const authenticate=async(req,_res,next)=>{
    let token=req.headers.authorization
    token=req.headers.authorization.split(' ')[1]
    if(!token) throw error('Authentication failed')
    try{
        const decoded=tokenService.verifyToken({token})
        const user=await userService.findUserByEmail(decoded.email)
        if(!user) throw error('Authentication failed')

        req.user=user
        next()

    }catch(e){
        next(error('Authentication failed',401))
    }
}

module.exports=authenticate