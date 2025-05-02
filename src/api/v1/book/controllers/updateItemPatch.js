const { isValidObjectId } = require("mongoose")
const error = require("../../../../utils/error")
const bookService=require('../../../../lib/book')
const uploadOnCloudinary = require("../../../../utils/cloudinary")
const updateItemPatch=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    const isValid=isValidObjectId(id)
    if(!isValid) throw error('Invalid id format',400)

    const localFilePath=req.file?.path
    const cloudinaryResponse=await uploadOnCloudinary(localFilePath)
    const imageUrl=cloudinaryResponse.url 
    
    const {name,authorName,summary,inStock,status}=req.body

    try{
        const book=await bookService.updateItemPatch({id,name,authorName,summary,image:imageUrl,inStock,status})

        const response={
            code:200,
            message: 'Book updated successfully',
            data:book,
            links:{
                self:`/books/${book._id}`
            }
        }

        res.status(200).json(response)

    }catch(e){
        next(e)
    }
}

module.exports=updateItemPatch