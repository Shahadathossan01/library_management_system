const router=require('express').Router()
const {controllers:authController}=require('../api/v1/auth')
router
.post('/register',authController.register)
.post('/login',(req,res)=>{
    res.status(200).json({message:'check login route'})
})

module.exports=router;