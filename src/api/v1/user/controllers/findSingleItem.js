const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const userService=require('../../../../lib/user')

const findSingleItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid id format',400)
    
    try{
        const user=await userService.findSingleItem(id)

        const response={
            data: user,
            links:{
                self: `${req.url}`
            }
        }

        res.status(200).json(response)
    }catch(e){  
        next(e)
    }

}

module.exports=findSingleItem;