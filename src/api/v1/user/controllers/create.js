const error = require("../../../../utils/error")
const userService=require('../../../../lib/user')
const create=async(req,res,next)=>{
    if(!req.body) throw error('Request body must be required',400)

    const {username,email,password,role}=req.body

    try{
        const user=await userService.createUser({username,email,password,role})
        
        const payload={
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        const response={
            code: 201,
            message: 'User Created Successfully',
            data: payload,
            links:{
                self: `${req.url}`,
                login: '/auth/login'
            }
        }

        res.status(201).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=create;