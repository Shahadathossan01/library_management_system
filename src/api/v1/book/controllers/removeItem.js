const bookService=require('../../../../lib/book')
const isValidObjectId = require('../../../../utils/isValidObjectId')
const removeItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    
    const isValid=isValidObjectId(id)
    if(!isValid) throw error('Invalid id format',400)
        
    try{
        await bookService.removeItem({id})
        res.status(204).end()

    }catch(e){
        next(e)
    }
}

module.exports=removeItem