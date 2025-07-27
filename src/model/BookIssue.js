const mongoose=require('mongoose')
const {Schema,model}=mongoose

const bookIssueSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    book:{
        type: Schema.Types.ObjectId,
        ref:'Book'
    },
    status:{
        type: String,
        enum: ['pending','cancelled','overdue','returned','public_hand'],
        default: 'pending'
    }
},{timestamps:true})

const BookIssue=model('BookIssue',bookIssueSchema)

module.exports=BookIssue;