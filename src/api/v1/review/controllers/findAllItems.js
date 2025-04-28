const defaults = require("../../../../config/defaults")
const reviewService=require('../../../../lib/review');
const { query } = require("../../../../utils");
const { reviewLinksGenerator } = require("../../../../utils/links");
const findAllItems=async(req,res,next)=>{
    const page=req.query.page || defaults.page;
    const limit=req.query.limit || defaults.limit;
    const sort_type=req.query.sort_type || defaultssort_type;
    const sort_by=req.query.sort_by || defaults.sort_by;
    const bookId=req.query.bookId || defaults.bookId;

    try{
        //find reviews
        const reviews=await reviewService.findAllItems({id:bookId,page,limit,sort_type,sort_by})

        //get transform reviews
        const data=query.getTransformedItems({
            items:reviews,
            selection:['_id','content','status','book','user','createdAt','updatedAt'],
            linkGenerator:reviewLinksGenerator
        })

        //generate pagination
        const totalItems=await reviewService.count(bookId)
        const pagination=query.getPagination({totalItems,limit,page})
        
        //generate links
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

module.exports=findAllItems;