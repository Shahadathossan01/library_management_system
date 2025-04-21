const router=require('express').Router()

router
.post('/register',(req,res)=>{
    res.status(200).json({message:'check register route'})
})
.post('/login',(req,res)=>{
    res.status(200).json({message:'check login route'})
})

module.exports=router;