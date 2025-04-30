const userService=require('../../../../lib/user')
const error = require('../../../../utils/error')

const ownerShip=(model='')=>async(req,_res,next)=>{
    if(model==='User'){
        const isOwner=await userService.checkOwnership({resourceId: req.params.id})

        if(isOwner){
            return next()
        }

        return next(error('Permission Denied',403))
    }
}

module.exports=ownerShip;