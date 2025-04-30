const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const userService=require('../../../../lib/user')
const updateItemPatch=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)

    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)
    
    if(!req.body) throw error('Request Body is required',400)

    const {username,firstName, lastName,city,village,phone,dateOfBirth,avator,role}=req.body;

    try{
        //update user
        const user=await userService.updateItemPatch({id,username,firstName, lastName,city,village,phone,dateOfBirth,avator,role})

        //generate response
        const response={
            code: 200,
            message: 'User Updated Successfully',
            data: user,
            links:{
                self:`${req.url}`,
                login:'/auth/login'
            }
        }

        res.status(200).json(response)

    }catch(e){
        next(e)
    }
}

module.exports=updateItemPatch;