const error = require("../../utils/error")
const { generateHash } = require("../../utils/hashing")
const { userExit, createUser } = require("../user")

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

module.exports={
    register
}