const { isValidObjectId } = require("mongoose")
const error = require("../../../../utils/error")
const defaults = require("../../../../config/defaults")
const reviewService=require('../../../../lib/review')
const {query}=require('../../../../utils');
const { reviewLinksGenerator } = require("../../../../utils/links");



const findReviewsByBookId=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    const isValid=isValidObjectId(id)
    if(!isValid) throw error('Invalid id format',400)

    const page=req.query.page || defaults.page
    const limit=req.query.limit || defaults.limit

    try{
        //find all reviews
        const reviews=await reviewService.findAllItems({id,page,limit})
        
        //transform reviews
        const data=query.getTransformedItems({
            items:reviews,
            selection: ['_id','content','status','book','user','createdAt','updatedAt'],
            linkGenerator:reviewLinksGenerator
        })

        //generate pagination
        const totalItems=await reviewService.count(id)
        const pagination=query.getPagination({totalItems,limit,page})


        //generate HATEOAS link
        const links=query.getHATEOASForAllItems({
            url:req.url,
            path:req.path,
            query:req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page
        })

        //generate response
        const response={
            data,
            pagination,
            links
        }

        res.status(200).json(response)


    }catch(e){
        next(e)
    }
}

module.exports=findReviewsByBookId;