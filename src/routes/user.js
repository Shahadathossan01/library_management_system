const router=require('express').Router()
const {controllers:userController}=require('../api/v1/user')

router
    .get('/users',userController.findAllItems)



module.exports=router