const defaults = require("../../../../config/defaults");
const bookIssueService=require('../../../../lib/bookIssue');
const { query } = require("../../../../utils");
const { bookIssueLinksGenerator } = require("../../../../utils/links");
const findAllItems=async(req,res,next)=>{
    const page=req.query.page || defaults.page;
    const limit=req.query.limit || defaults.limit;
    const sort_type=req.query.sort_type || defaults.sort_type;
    const sort_by=req.query.sort_by || defaults.sort_by;

    try{
        //get bookIssues
        const bookIssues=await bookIssueService.findAllItems({page,limit,sort_type,sort_by})

        //get transform bookIssues and generate HATEOAS links
        const data=query.getTransformedItems({
            items: bookIssues,
            selection:['_id','book','user','status','createdAt','updatedAt'],
            linkGenerator:bookIssueLinksGenerator
        })

        //generate pagination
        const totalItems=await bookIssueService.count()
        const pagination=query.getPagination({totalItems,page,limit})

        //generate links
        const links=query.getHATEOASForAllItems({
            url: req.url,
            path: req.path,
            query: req.query,
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