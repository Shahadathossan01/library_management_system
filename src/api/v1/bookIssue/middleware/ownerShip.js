const bookIssueService=require('../../../../lib/bookIssue')
const error = require('../../../../utils/error')

const ownerShip=(model='')=>async(req,_res,next)=>{
    if(model==='BookIssue'){
        const isOwner=await bookIssueService.checkOwnership({resourceId: req.params.id})

        if(isOwner){
            return next()
        }

        return next(error('Permission Denied',403))
    }
}

module.exports=ownerShip;