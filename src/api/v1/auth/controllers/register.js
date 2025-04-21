const register=async(req,res,next)=>{
    try{
        res.status(200).json({message:'register controller created'})
    }catch(e){
        next(e)
    }
}

module.exports=register;