const reviewService=require('../../../../lib/review')
const error = require('../../../../utils/error')
const ownerShip=(model='')=>async(req,_res,next)=>{
    if(model==='Review'){
        const isOwner=await reviewService.checkOwnership({resourceId: req.params.id})

        if(isOwner){
            return next()
        }

        return next(error('Permission Denied',403))
    }
}

module.exports=ownerShip;