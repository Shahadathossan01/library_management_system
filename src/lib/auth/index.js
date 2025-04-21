const error = require("../../utils/error")
const { generateHash, hashMatch } = require("../../utils/hashing")
const { generateToken } = require("../token")
const { userExit, createUser, findUserByEmail } = require("../user")

const register=async({username,email,password,role='user'})=>{
    //check user exit or not (return true or false)
    const hasUser=await userExit(email)
    if(hasUser){
        throw error('User already exist',400)
    }

    //hash password
    password=await generateHash(password)

    //create user
    const user=await createUser({username,email,password,role})
    return user;
    
}
const login=async({email,password})=>{
    //find user
    const user=await findUserByEmail(email)
    if(!user) throw error('Invalid Credential')
    
    //compare password
    const matched=await hashMatch(password,user?.password)
    if(!matched) throw error('Invalid Credential')
    
    //generate access_token
    const payload={
        _id:user?._id,
        username:user?.username,
        email:user?.email,
        role:user?.role
    }
    
    const access_token=generateToken({payload})
    return access_token;
}
module.exports={
    register,
    login
}