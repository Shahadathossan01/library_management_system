const bookService=require('../../../../lib/book')
const create=async(req,res,next)=>{
    const {name,authorName,summary,image,inStock,status}=req.body

    try{
        //create book
        const book=await bookService.create({name,authorName,summary,image,inStock,status})

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