const { sort_type, sort_by } = require("../../config/defaults")
const BookIssue = require("../../model/BookIssue")
const error = require("../../utils/error")

const create=async({book,user,status='pending'})=>{
    if(!book || !user) throw error('Invalid Parameters',400)

    const bookIssue=new BookIssue({user,book,status})
    await bookIssue.save()

    return bookIssue._doc;
}

const findAllItems=async({page,limit,sort_type,sort_by})=>{
    
    const sortStr=`${sort_type==='dsc' ? '-' :''}${sort_by}`

    const bookIssues=await BookIssue.find()
        .populate({
            path: 'book',
            select: '_id name authorName summary image'
        })
        .sort(sortStr)
        .skip(page*limit -limit)
        .limit(limit)

    if(bookIssues.length === 0)throw error('Requested Resource not found',400)
    
    return bookIssues;
   
}

const count=()=>{
    return BookIssue.countDocuments()
}

module.exports={
    create,
    findAllItems,
    count
}