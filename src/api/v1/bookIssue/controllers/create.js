const error = require("../../../../utils/error")
const isValidObjectId = require("../../../../utils/isValidObjectId")
const bookIssueService=require('../../../../lib/bookIssue')
const create=async(req,res,next)=>{
    const user=req.user

    //check user
    if(!user) throw error('user not found',403)

    //check req.body
    if(!req.body) throw error('Invalid Parameters',400)

    const {bookId}=req.body

    //check bookId format (mongoose object id)
    const validId=isValidObjectId(bookId)
    if(!validId) throw error('Invalid ID format',400)
    
    try{
        //create bookIssue
        const bookIssue=await bookIssueService.create({book:bookId,user:user._id})

        //generate response
        const response={
            code: 201,
            message: 'BookIssue created successfully',
            data:bookIssue,
            links:{
                self:`/${req.url}/${bookIssue._id}`,
                book:`/${req.url}/${bookIssue._id}/book`,
                author:`/${req.url}/${bookIssue._id}/author`,
            }
        }

        res.status(201).json(response)
    }catch(e){
        next(e)
    }
}

module.exports=create