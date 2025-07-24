const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const reviewService=require('../../../../lib/review')
const updateItemPatch=async(req,res,next)=>{
    console.log(req.params)
    //check id is exit or not.
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    //if id exit then check id format (mongoose object)
    const isValid=isValidObjectId(id)
    if(!isValid) throw error('Invalid id format',400)

    //check req.body
    if(!req.body) throw error('Invalid Parameters',400)
    const {content,status}=req.body
    
    try{
        //get review
        const review=await reviewService.updateItemPatch({id,content,status})
        
        //generate response
        const response={
            code: 200,
            message: 'Review updated successfully',
            data: review,
            link:{
                self:`${req.url}/${review._id}`,
                book:`${req.url}/${review._id}/book`,
                author:`${req.url}/${review._id}/author`
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=updateItemPatch;