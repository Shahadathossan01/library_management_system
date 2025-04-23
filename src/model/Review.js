const mongoose=require('mongoose')
const {Schema,model}=mongoose

const reviewSchema=new Schema({
    content:{
        type: String,
    },
    status:{
        type: String,
        enum: ['public','private'],
        default:'public'
        
    },
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},{timestamps:true})

const Review=model('Review',reviewSchema)

module.exports=Review;