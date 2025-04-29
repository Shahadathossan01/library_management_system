const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const bookIssueService=require('../../../../lib/bookIssue')

const updateItemPatch=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)

    if(!req.body) throw error('Invalid parameters',400)
    const {status}=req.body

    try{
        const bookIssue=await bookIssueService.updateItemPatch({id,status})

        const response={
            code:200,
            message: 'BookIssue updated successfully',
            data:bookIssue,
            links:{
                self:`/bookIssues/${bookIssue._id}`,
                book:`/bookIssues/${bookIssue._id}/book`,
                author:`/bookIssues/${bookIssue._id}/user`,
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=updateItemPatch;