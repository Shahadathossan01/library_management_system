const mongoose=require('mongoose')
const {Schema,model}=mongoose

const bookSchema=new Schema({
    name:{
        type: String,
    },
    authorName:{
        type: String,
    },
    summary:{
        type: String,
    },
    image:{
        type: String,
    },
    inStock:{
        type: Number,
    },
    status:{
        type: String,
        enum: ['available','othersHand'],
        default: 'available'
    }
},{
    timestamps:true,
    toObject: {virtuals:true},
    toJSON: {virtuals: true}
})

bookSchema.virtual('reviews',{
    ref:'Review',
    localField: '_id',
    foreignField: 'book'
})

const Book=model('Book',bookSchema)

module.exports=Book;