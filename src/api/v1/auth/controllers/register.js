const authService=require('../../../../lib/auth')
const { generateToken } = require('../../../../lib/token')
const register=async(req,res,next)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password) throw error('Invalid parameters')
    try{
        //register user
        const user=await authService.register({username,email,password})
        
        //generate access_token
        const payload={
            _id:user?._id,
            username:user?.username,
            email:user?.email,
            role:user?.role
        }
        const access_token=generateToken({payload})

        //response
        const response={
            code: 201,
            message: 'Registration successful.',
            data:{
                access_token:access_token
            },
            links:{
                self: '/auth/register',
                login: '/auth/login'
            }
        }

        res.status(201).json(response)

    }catch(e){
        next(e)
    }
}

module.exports=register;