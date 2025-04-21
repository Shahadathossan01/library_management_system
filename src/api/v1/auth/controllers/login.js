const authService=require('../../../../lib/auth')
const login=async(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password) throw error('Invalid parameters')
    try{
        //generate access_token
        const access_token=await authService.login({email,password})

        //response
        const response={
            code:200,
            message:'Login successful.',
            data:{
                access_token:access_token
            },
            links:{
                self:'/auth/login'
            }
        }

        res.status(200).json(response)
        
    }catch(e){
        next(e)
    }
}

module.exports=login;