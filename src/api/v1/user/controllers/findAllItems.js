const defaults = require("../../../../config/defaults")
const userService=require('../../../../lib/user');
const { query } = require("../../../../utils");
const findAllItems=async(req,res)=>{
    const page=req.query.page || defaults.page;
    const limit=req.query.limit || defaults.limit;
    const sort_type=req.query.sort_type || defaults.sort_type;
    const sort_by=req.query.sort_by || defaults.sort_by;
    const search=req.query.search || defaults.search;


    try{
        const user=await userService.findAllItems({page,limit,sort_type,sort_by,search})

        const totalItems=await userService.count({search})
        const pagination=query.getPagination({totalItems,limit,page})

        const links=query.getHATEOASForAllItems({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page
        })

        const response={
            data: user,
            pagination,
            links
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=findAllItems