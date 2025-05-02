const router=require('express').Router()
const {controllers:authController}=require('../api/v1/auth');

router
.post('/register',authController.register)
.post('/login',authController.login)

module.exports=router;