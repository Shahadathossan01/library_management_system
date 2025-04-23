const bookService=require('../../../../lib/book')
const removeItem=async(req,res,next)=>{
    const {id}=req.params

    try{
        await bookService.removeItem({id})
        res.status(204).end()

    }catch(e){
        next(e)
    }
}

module.exports=removeItem