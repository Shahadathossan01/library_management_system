const BookIssue = require("../../model/BookIssue")
const error = require("../../utils/error")

const create=async({book,user,status='pending'})=>{
    if(!book || !user) throw error('Invalid Parameters',400)

    const bookIssue=new BookIssue({user,book,status})
    await bookIssue.save()

    return bookIssue._doc;
}

module.exports={
    create
}