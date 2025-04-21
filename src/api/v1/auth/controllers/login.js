const login=async(req,res,next)=>{
    try{
        res.status(200).json({message:'login controller route'})
    }catch(e){
        next(e)
    }
}

module.exports=login;