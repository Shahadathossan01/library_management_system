const isValidObjectId = require("../../../../utils/isValidObjectId");
const bookService=require('../../../../lib/book');
const error = require("../../../../utils/error");
const findSingleItem=async(req,res,next)=>{
    const {id}=req.params

    //check id is valid object id
    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)
    
    const expand=req.query.expand || ''

    try{
        const book=await bookService.findSingleItem({id,expand})

        //generate response
        const response={
            data: book,
            links:{
                self:`/books/${book._id}`,
                reviews:`/books/${book._id}/reviews`
            }
        }

        res.status(200).json(response)
    }catch(e){
        next(e)
    }

}

module.exports=findSingleItem;