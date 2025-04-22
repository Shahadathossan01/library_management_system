const Book = require("../../model/Book")
const error = require("../../utils/error")

const create=async({name,authorName,summary,image,inStock,status='available'})=>{
    //validate parameters
    if(!name || !authorName || !summary || !image || !inStock) throw error('Invalid Parameters',400)
    
    //create book and return
    const book=new Book({name,authorName,summary,image,inStock,status})
    await book.save()

    return book?._doc

}

module.exports={
    create
}