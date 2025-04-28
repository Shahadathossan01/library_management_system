const reviewService=require('../../../../lib/review')
const error = require('../../../../utils/error')
const isValidObjectId = require('../../../../utils/isValidObjectId')
const create=async(req,res,next)=>{
    const user=req.user._id
    const {content,bookId,status}=req.body
    
    const validId=isValidObjectId(bookId)
    if(!validId) throw error('Invalid bookId format',400)
    
    try{
        const review=await reviewService.create({content,book:bookId,user,status})
        const response={
            code: 201,
            message: 'Review created successfully',
            data: review,
            links:{
                self:`/${req.url}/${review._id}`,
                book:`/${req.url}/${review._id}/book`,
                author:`/${req.url}/${review._id}/author`
            }
        }
        res.status(201).json(response)
    }catch(e){
        next(e)
    }

}

module.exports=create