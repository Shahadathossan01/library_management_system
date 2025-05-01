const defaults = require("../../config/defaults");
const Book = require("../../model/Book");
const Profile = require("../../model/Profile");
const Review = require("../../model/Review");
const User = require("../../model/User");
const error = require("../../utils/error");

const create=async({content,book,user,status='public'})=>{
    
    const review=new Review({content,book,user,status})
    await review.save()

    return review._doc

}

const findAllItems=async({id,page=defaults.page,
    limit=defaults.limit,sort_type=defaults.sort_type,
        sort_by=defaults.sort_by,})=>{

        const sortStr=`${sort_type==='dsc' ? '-' : ''}${sort_by}`;
        const filter=id? {book:id}:{}
        const reviews=await Review.find(filter)
            .populate({
                path:'user',
                select: 'username email role createdAt updatedAt _id',
                strictPopulate:false
            })
            .sort(sortStr)
            .skip(page*limit-limit)
            .limit(limit)

        if(reviews.length===0) throw error('Requested resource not found',404)

        return reviews.map((review)=>({
            ...review._doc
        }))
}

const count=(id)=>{
    const filter=id? {book:id}:{}
    return Review.countDocuments(filter)
}

const updateItemPatch=async({id,content,status})=>{
    const review=await Review.findById(id)
    if(!review) throw error('Resource not found',400)
    
    const payload={
        content,
        status
    }

    Object.keys(payload).forEach((key)=>{
        review[key]=payload[key] ?? review[key]
    })

    await review.save()

    return review._doc;
}

const removeItem=async(id)=>{
    const review=await Review.findById(id)
    if(!review) throw error('Resource not found')
    
    return await Review.findByIdAndDelete(id)
}

const findSingleItem=async(id,expand='')=>{
    const review=await Review.findById(id)

    if(!review) throw error('Resource not found',404)
    
    //generate exapnd array
    expand=expand.split(',').map((item)=>item.trim())
    
    //when expand is book
    if (expand.includes('book')) {
        await review.populate('book', 'name authorName summary image inStock status _id');
    }

    //whenn expand is author
    if (expand.includes('author')) {
        await review.populate('user', 'username email role createdAt _id');
    }


    return {
        ...review._doc
    }
    
}

const findBook = async (reviewId, expand = '') => {

    const review = await Review.findById(reviewId);
    if (!review) throw error('Review not found', 404);

    const book = await Book.findById(review.book);
    if (!book) throw error('Book not found', 404);

     //if expand if equal reviews
     if(expand==='reviews'){
        await book.populate({
            path: 'reviews',
            select: 'content user status createdAt updatedAt _id',
            strictPopulate:false
        })
    }

    return book;
};

const findAuthor=async(reviewId)=>{
    const review=await Review.findById(reviewId)
    if(!review) throw error('Review not found',400)

    const user=await User.findOne({_id:review.user})
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
    const review=await Review.findById(resourceId)
    if(!review) throw error('Resource Not Found',400)
    
    return true;
}
module.exports={
    create,
    count,
    findAllItems,
    updateItemPatch,
    removeItem,
    findSingleItem,
    findBook,
    findAuthor,
    checkOwnership
};