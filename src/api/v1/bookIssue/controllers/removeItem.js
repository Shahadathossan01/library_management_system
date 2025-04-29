const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const bookIssueService=require('../../../../lib/bookIssue')
const removeItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid Id format',400)

    try{
        await bookIssueService.removeItem({id})
        res.status(204).end()
    }catch(e){
        next(e)
    }
}

module.exports=removeItem;