const jwt=require('jsonwebtoken')
const error = require('../../utils/error')

const generateToken=({payload,algorithm='HS256',secret=process.env.ACCESS_TOKEN_SECRET,expiresIn='5h'})=>{
    try{
        const access_token=jwt.sign(payload,secret,{
            algorithm,
            expiresIn
        })
        return access_token;
    }catch(e){
        console.log('[JWT]',e)
        throw error()
    }
}

module.exports={
    generateToken
}