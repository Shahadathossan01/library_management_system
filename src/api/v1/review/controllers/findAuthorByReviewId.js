const { isValidObjectId } = require("mongoose")
const error = require("../../../../utils/error")
const reviewService=require('../../../../lib/review')
const findAuthorByReviewId=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    
    const validId=isValidObjectId(id)
    if(!validId) error('Invalid ID format',400)

    try{
        const author=await reviewService.findAuthor(id)

        const response={
            data: author,
            links:{
                self: `/users/${author._id}`
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=findAuthorByReviewId