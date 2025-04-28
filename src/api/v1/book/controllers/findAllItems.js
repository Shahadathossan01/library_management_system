const defaults = require("../../../../config/defaults")
const bookService=require('../../../../lib/book')
const {query}=require('../../../../utils');
const { bookLinksGenerator } = require("../../../../utils/links");
const findAllItems=async(req,res,next)=>{
    const page=req.query.page || defaults.page;
    const limit=req.query.limit || defaults.limit;
    const sort_type=req.query.sort_type || defaults.sort_type;
    const sort_by=req.query.sort_by || defaults.sort_by;
    const search=req.query.search || defaults.search;

    try{
        //find all books
        const books=await bookService.findAllItems({
            page,
            limit,
            sort_type,
            sort_by,
            search
        })

        const data=query.getTransformedItems({
            items:books,
            selection:['_id','name','authorName','summary','image','inStock','status','createdAt','updatedAt'],
            linkGenerator:bookLinksGenerator
        })
        
        //pagination
        const totalItems=await bookService.count({search})
        const pagination=query.getPagination({totalItems,limit,page})

        //get HATEOAS link
        const links=query.getHATEOASForAllItems({
            url:req.url,
            path:req.path,
            query:req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page
        })
        
        res.status(200).json({
            data,
            pagination,
            links
        })

    }catch(e){
        next(e)
    }

}

module.exports=findAllItems;