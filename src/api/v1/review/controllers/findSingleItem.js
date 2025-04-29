const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const reviewService=require('../../../../lib/review')
const findSingleItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    
    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)
    
    const expand=req.query.expand || ''

    try{
        //find review
        const review=await reviewService.findSingleItem(id,expand)

        //generate response
        const response={
            data: review,
            links:{
                self:`/${req.url}/${review._id}`,
                book:`/${req.url}/${review._id}/book`,
                author:`/${req.url}/${review._id}/author`,
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=findSingleItem;