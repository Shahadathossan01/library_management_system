const bcrypt=require('bcryptjs')

const generateHash=async(payload,saltRound=10)=>{
    const salt=await bcrypt.genSalt(saltRound)
    const hash=await bcrypt.hash(payload,salt)
    return hash;
}

module.exports={
    generateHash
}