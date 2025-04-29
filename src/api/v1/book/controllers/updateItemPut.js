const { isValidObjectId } = require("mongoose");
const error = require("../../../../utils/error");
const bookService=require('../../../../lib/book')

const updateItemPut=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    const isValid=isValidObjectId(id)
    if(!isValid) throw error('Invalid id format',400)
    const name=req.body.name || ''
    const authorName=req.body.authorName || ''
    const summary=req.body.summary || ''
    const image=req.body.image || ''
    const inStock=req.body.inStock || 0
    const status=req.body.status || 'available'

    try{
        const {book,code}=await bookService.updateItemPut({id,name,authorName,summary,image,inStock,status})

        const response={
            code,
            message: code=== 200 ?'book updated successfully':'book created successfully',
            data:book,
            links:{
                self:`/books/${book?._id}`
            }

        }

        res.status(200).json(response)

    }catch(e){
        next(e)
    }
}

module.exports=updateItemPut;