const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const userService=require('../../../../lib/user')
const { query } = require("../../../../utils")
const { bookIssueLinksGenerator } = require("../../../../utils/links")
const bookIssueService=require('../../../../lib/bookIssue')
const findBookIssuesByUserId=async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)
    
    const page=req.query.page || defaults.page;
    const sort_by=req.query.sort_by || defaults.sort_by;
    const limit=req.query.limit || defaults.limit;
    const sort_type=req.query.sort_type || defaults.sort_type;

    try{
        //get bookIssues
        const bookIssues=await userService.findBookIssuesByUserId({id,page,limit,sort_type,sort_by})

        //get transform bookIssues and generate HATEOAS links
        const data=query.getTransformedItems({
            items: bookIssues,
            selection:['_id','book','user','status','createdAt','updatedAt'],
            linkGenerator:bookIssueLinksGenerator
        })

        //generate pagination
        const totalItems=await bookIssueService.count(id)
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

module.exports=findBookIssuesByUserId