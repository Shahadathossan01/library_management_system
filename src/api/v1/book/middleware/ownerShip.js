const bookService=require('../../../../lib/book')
const error = require('../../../../utils/error')
const ownerShip=(model='')=>async(req,_res,next)=>{
    if(model==='Book'){
        const isOwner=await bookService.checkOwnership({resourceId: req.params.id})

        if(isOwner){
            return next()
        }

        return next(error('Permission Denied for owner',403))
    }
}

module.exports=ownerShip;