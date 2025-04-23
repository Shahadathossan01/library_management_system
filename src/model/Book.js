const mongoose=require('mongoose')
const {Schema,model}=mongoose

const bookSchema=new Schema({
    name:{
        type: String,
        required:true
    },
    authorName:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required: true
    },
    inStock:{
        type: String,
        required:true
    },
    status:{
        type: String,
        enum: ['available','othersHand'],
        default: 'available'
    }
},{timestamps:true})

bookSchema.virtual('reviews',{
    ref:'Review',
    localField: '_id',
    foreignField: 'book'
})

const Book=model('Book',bookSchema)

module.exports=Book;