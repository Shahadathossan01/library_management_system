const defaults = require("../../config/defaults");
const Review = require("../../model/Review");
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
module.exports={
    create,
    count,
    findAllItems,
    updateItemPatch
};