const error = require("../../../../utils/error");
const isValidObjectId = require("../../../../utils/isValidObjectId");
const reviewService=require('../../../../lib/review')
const findBookByReviewId=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)

    const expand=req.query.expand || ''

    try{
        const book=await reviewService.findBook(id,expand)
        
        const response={
            data:book,
            links:{
                self: `/${req.url}/${book._id}`,
                reviews: `/${req.url}/${book._id}/reviews`
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=findBookByReviewId;