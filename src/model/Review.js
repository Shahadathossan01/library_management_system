const mongoose=require('mongoose')
const {Schema,model}=mongoose

const reviewSchema=new Schema({
    content:{
        type: String,
        required: true
    },
    status:{
        type: Schema.Types.ObjectId,
        enum: ['public','private'],
        default:'public'
        
    },
    book:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true})

const Review=model('Review',reviewSchema)

module.exports=Review;