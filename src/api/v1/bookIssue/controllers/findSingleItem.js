const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const bookIssueService=require('../../../../lib/bookIssue')
const findSingleItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)
    
    const expand=req.query.expand || ''


    try{
        const bookIssue=await bookIssueService.findSingleItem({id,expand})

        const response={
            data: bookIssue,
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

module.exports=findSingleItem;