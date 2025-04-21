const Profile = require("../../model/Profile");
const User = require("../../model/User");
const error = require("../../utils/error");

const findUserByEmail=async(email)=>{
    //return user or false
    const user=await User.findOne({email})
    return user?user:false;
}

const userExit=async(email)=>{
    //return true or false
    const user=await findUserByEmail(email)
    return user?true:false;
}

const createUser=async({username,email,password,role='user'})=>{
    if(!username || !email || !password) throw error('Invalid parameters')
    
    //create user
    const user=new User({username,email,password,role})
    const profile=new Profile({user:user?._id})
    await user.save()
    await profile.save()
    return user._doc
}

module.exports={
    findUserByEmail,
    userExit,
    createUser
}