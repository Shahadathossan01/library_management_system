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

        const reviews=await Review.find({book:id})
            .populate({
                path:'user'
            })
            .sort(sortStr)
            .skip(page*limit-limit)
            .limit(limit)

        if(reviews.length===0) throw error('Requested resource not found',404)

        return reviews.map((review)=>({
            ...review._doc
        }))
}

const count=()=>{
    return Review.countDocuments()
}

module.exports={
    create,
    findAllItems,
    count,
};