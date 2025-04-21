const mongoose=require('mongoose')
const {Schema,model}=mongoose

const profileSchema=new Schema({
    firstName:{
        type: String,
        maxLength: 50,
        default:''
    },
    lastName:{
        type: String,
        maxLength: 50,
        default:''
    },
    city:{
        type: String,
        maxLength: 20,
        default:''
    },
    village:{
        type: String,
        maxLength: 20,
        default:''
    },
    phone:{
        type: String,
        default:''
    },
    dateOfBirth:{
        type: String,
        default: ''
    },
    avator:{
        type: String,
        default:''
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Profile=model('Profile',profileSchema)

module.exports=Profile;