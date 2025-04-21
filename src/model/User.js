const mongoose=require('mongoose')
const {Schema,model}=mongoose

const userSchema=new Schema({
    username:{
        type: String,
        maxLength: 50,
        minLength: 5,
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
})

const User=model('User',userSchema)

module.exports=User;