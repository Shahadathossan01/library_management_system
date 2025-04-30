const { isValidObjectId } = require("mongoose")
const error = require("../../../../utils/error")
const bookIssueService=require('../../../../lib/bookIssue')

const findBookByBookIssueId=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)

    const expand=req.query.expand || ''

    try{
        const book=await bookIssueService.findBookByBookIssueId({id,expand})
                
        const response={
            data:book,
            links: `/${req.url}/${book._id}`,
            reviews: `/${req.url}/${book._id}/reviews`
        }
        
        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}


module.exports=findBookByBookIssueId;