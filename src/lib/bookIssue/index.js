const { sort_type, sort_by } = require("../../config/defaults")
const Book = require("../../model/Book")
const BookIssue = require("../../model/BookIssue")
const User = require("../../model/User")
const error = require("../../utils/error")

const create=async({book,user,status='pending'})=>{
    if(!book || !user) throw error('Invalid Parameters',400)
    
    // Check if the book exists
    const findBook = await Book.findById(book);
    if (!findBook) throw error('Book not found', 404);

    // Check stock availability
    if (findBook.inStock < 1) throw error('Book out of stock', 400);

    // Decrease the stock
    findBook.inStock = findBook.inStock - 1;
    await findBook.save();

    const bookIssue=new BookIssue({user,book,status})
    await bookIssue.save()

    return bookIssue._doc;
}

const findAllItems=async({page,limit,sort_type,sort_by})=>{
    
    const sortStr=`${sort_type==='dsc' ? '-' :''}${sort_by}`

    const bookIssues=await BookIssue.find()
        .populate({
            path: 'book',
            select: '_id name authorName summary image createdAt updatedAt'
        })
        .populate({
            path: 'user',
            select: '_id username email role createdAt updatedAt'
        })
        .sort(sortStr)
        .skip(page*limit -limit)
        .limit(limit)

    if(bookIssues.length === 0)throw error('Requested Resource not found',400)
    
    return bookIssues;
   
}

const count=(id)=>{
    const filter=id? {user:id}:{}
    return BookIssue.countDocuments(filter)
}


const updateItemPatch=async({id,status})=>{

    if(!id || !status) throw error('Invalid Parameters',400)

    const bookIssue=await BookIssue.findById(id).populate({
        path: 'book',
        select: '_id name authorName summary image'
    })

    if(!bookIssue) throw error('Resource not found',404)
    
    bookIssue.status=status ?? bookIssue.status;
    await bookIssue.save()

    return bookIssue

}

const removeItem=async({id})=>{
    const bookIssue=await BookIssue.findById(id)
    if(!bookIssue) throw error('Resource not found',404)

    return await BookIssue.findByIdAndDelete(id)
}

const findSingleItem=async({id,expand=''})=>{
    if(!id) throw error('Id is required',400)
    
    expand=expand.split(',').map((item)=>item.trim());

    const bookIssue=await BookIssue.findById(id)
    if(!bookIssue) throw error('Resource not found',404)

    if(expand.includes('book')){
        await bookIssue.populate({
            path: 'book',
            select: '_id name authorName summary image inStock status createdAt updatedAt',
            strictPopulate: false
        })
    }
    if(expand.includes('author')){
        await bookIssue.populate({
            path: 'user',
            select: '_id username email role createdAt updatedAt',
            strictPopulate: false
        })
    }

    return bookIssue;
}

const findBookByBookIssueId=async({id,expand=''})=>{
    
    const bookIssue = await BookIssue.findById(id)
    if (!bookIssue) throw error('BookIssue not found', 400)

    const book=await Book.findById(bookIssue.book)
    if(!book) throw error('Book not found',400)

    //if expand if equal reviews
    if(expand){
        await book.populate({
            path: 'reviews',
            select: 'content user status createdAt updatedAt _id',
            strictPopulate:false
        })
    }

    return book;
}

const findAuthor=async(id)=>{
    const bookIssue=await BookIssue.findById(id)
    if(!bookIssue) throw error('Review not found',400)

        const user=await User.findOne({_id:bookIssue.user})
        .select('-password')
        .populate({
            path: 'profile',
            select:'firstName lastName city village phone dateOfBirth avator -user',
            strictPopulate:false
        })
    
        if(!user) throw error('User not found',400) 
        
        return user;
}

const checkOwnership=async({resourceId})=>{
    const bookIssue=await BookIssue.findById(resourceId)
    if(!bookIssue) throw error('Resource Not Found',400)
    
    return true;
}
module.exports={
    create,
    findAllItems,
    count,
    updateItemPatch,
    removeItem,
    findSingleItem,
    findBookByBookIssueId,
    findAuthor,
    checkOwnership
}