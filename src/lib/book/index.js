const defaults = require("../../config/defaults")
const Book = require("../../model/Book")
const Review = require("../../model/Review")
const error = require("../../utils/error")
require('../../model/Review')
const create=async({name,authorName,summary,image,inStock,status='available'})=>{
    
    //validate parameters
    if(!name || !authorName || !summary || !image || !inStock) throw error('Invalid Parameters',400)
    
    //create book and return
    const book=new Book({name,authorName,summary,image,inStock,status})
    await book.save()

    return book?._doc
}

const findAllItems=async({
    page=defaults.page,
    limit=defaults.limit,
    sort_type=defaults.sort_type,
    sort_by=defaults.sort_by,
    search=defaults.search
})=>{
    //sort books
    const sortStr=`${sort_type==='dsc' ? '-' : ''}${sort_by}`;

    //filter books
    const filter={
        $or:[
            {name:{$regex: search, $options: 'i'}},
            {authorName:{$regex: search, $options: 'i'}}
        ]
    }

    const books=await Book.find(filter)
        .sort(sortStr)
        .skip(page*limit-limit)
        .limit(limit)

        if(books.length===0) throw error('Requested resource not found',404)
    
    return books.map(book=>({
        ...book._doc
    }))
    
}

const count=({search=''})=>{
    const filter={
        $or:[
            {name:{$regex: search, $options: 'i'}},
            {authorName:{$regex: search, $options: 'i'}}
        ]
    }
    
    return Book.countDocuments(filter)
}

const findSingleItem=async({id,expand})=>{
    if(!id) throw error('Id is required')
    
    const book=await Book.findById(id)

    if(!book) throw error('Requested resource not found',404)

    //if expand if equal reviews
    if(expand){
        await book.populate({
            path: 'reviews',
            select: 'content user status createdAt updatedAt _id',
            strictPopulate:false
        })
    }

    delete book.id

    return book;
}

const updateItemPut=async({id,name,authorName,summary,image,inStock,status})=>{
    if(!id) throw error('Id is required')
    const book=await Book.findById(id)

    if(!book){
        const book=await create({name,authorName,summary,image,inStock,status})
        return {
            book:book,
            code:201
        }
    }

    const payload={
        name:name || book.name,
        authorName:authorName || book.authorName,
        summary:summary || book.summary,
        image:image || book.image,
        inStock:inStock || book.inStock,
        status:status || book.status
    }
    book.overwrite(payload)
    await book.save()

    return {book:book._doc,code:200}
}

const updateItemPatch=async({id,name,authorName,summary,image,inStock,status})=>{
    const book=await Book.findById(id)
    if(!book) throw error('Resource not found',404)
    
    const payload={
        name,
        authorName,
        summary,
        image,
        inStock,
        status
    }

    if(inStock>=1){
        payload.status='available'
    }

    if(inStock <=0){
        payload.status='out_of_stock'
    }

    Object.keys(payload).forEach((key)=>{
        book[key]=payload[key] ?? book[key]
    })
    await book.save()

    return book._doc
    
}

const removeItem=async({id})=>{
    const book=await Book.findById(id)
    if(!book) throw error('Resource not found',404)
    
    await Review.deleteMany({book:id})

    return await Book.findByIdAndDelete(id)
}

const checkOwnership=async({resourceId})=>{
    const book=await Book.findById(resourceId)
    if(!book) throw error('Resource Not Found',400)
    
    return true;
}

module.exports={
    create,
    findAllItems,
    count,
    findSingleItem,
    updateItemPut,
    updateItemPatch,
    removeItem,
    checkOwnership
}