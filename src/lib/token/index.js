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

const verifyToken=({token,algorithm='HS256',secret=process.env.ACCESS_TOKEN_SECRET})=>{
    
    try{
        return jwt.verify(token,secret,{algorithms:[algorithm]})
    }catch(e){
        console.log(e)
        throw error('Internal server error')
    }
}

module.exports={
    generateToken,
    verifyToken
}