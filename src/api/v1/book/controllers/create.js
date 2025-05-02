const bookService=require('../../../../lib/book')
const uploadOnCloudinary = require('../../../../utils/cloudinary')
const create=async(req,res,next)=>{

    const localFilePath=req.file?.path
    const cloudinaryResponse=await uploadOnCloudinary(localFilePath)
    const imageUrl=cloudinaryResponse.url 

    const {name,authorName,summary,inStock,status}=req.body
    
    try{
        //create book
        const book=await bookService.create({name,authorName,summary,image:imageUrl,inStock,status})

        //generate response
        const response={
            code: 201,
            message: 'Book created successfully',
            data:{
                ...book
            },
            links:{
                self: `/books/${book?._id}`,
                reviews:`/books/${book?._id}/reviews`
            }
        }
        
        res.status(201).json(response)
        
    }catch(e){
        next(e)
    }
}

module.exports=create;