const isValidObjectId = require("../../../../utils/isValidObjectId");
const bookService=require('../../../../lib/book');
const error = require("../../../../utils/error");
const findSingleItem=async(req,res,next)=>{
    const {id}=req.params
    if(!id) throw error('Id is required',400)
    //check id is valid object id
    const validId=isValidObjectId(id)
    if(!validId) throw error('Invalid ID format',400)
    
    const expand=req.query.expand || ''

    try{
        const book=await bookService.findSingleItem({id,expand})
        // console.log(book)
        //generate response
        const response={
            data: book,
            links:{
                self:`/books/${book._id}`,
                reviews:`/books/${book._id}/reviews`
            }
        }

        // console.log('check controller response',response)

        res.status(200).json(response)
    }catch(e){
        next(e)
    }

}

module.exports=findSingleItem;