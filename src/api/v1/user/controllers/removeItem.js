const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const userService=require('../../../../lib/user')
const removeItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)

    try{
        await userService.removeItem(id)
        res.status(204).end()
    }catch(e){
        next(e)
    }
}

module.exports=removeItem