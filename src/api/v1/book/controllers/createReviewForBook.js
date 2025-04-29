const { isValidObjectId } = require("mongoose")
const error = require("../../../../utils/error")
const reviewService=require('../../../../lib/review')

const createReviewForBook=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    const {content}=req.body
    const isValid=isValidObjectId(id)
    if(!isValid) throw error('Invalid id format',400)
    if(!content) throw error('Invalid paramerter')

    try{
        const review=await reviewService.create({content,book:id,user:req.user._id})

        const response={
            code:201,
            message:'Review created successfully',
            data:review,
            links:{
                self:`/reviews/${review._id}`,
                book:`/reviews/${review._id}/book`,
                author:`/reviews/${review._id}/user`
            }
        }

        res.status(201).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=createReviewForBook;