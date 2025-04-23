const defaults = require("../../config/defaults")
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
        .populate({
            path: 'reviews',
            select: 'content user status createdAt updatedAt -_id',
            strictPopulate:false
        })
        .sort(sortStr)
        .skip(page*limit-limit)
        .limit(limit)

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

    //expand query will be a string like reviews
    expand=expand.split(',').map((item)=>item.trim())

    //if expand if equal reviews
    if(expand.includes('reviews')){
        await book.populate({
            path: 'reviews',
            select: 'content user status createdAt updatedAt -_id',
            strictPopulate:false
        })
    }

    return book._doc;
}

module.exports={
    create,
    findAllItems,
    count,
    findSingleItem
}