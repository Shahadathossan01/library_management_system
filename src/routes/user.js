const router=require('express').Router()
const {controllers:userController}=require('../api/v1/user')

router
    .get('/users',userController.findAllItems)
    .post('/users',userController.create)
    .get('/users/:id',userController.findSingleItem)
    .patch('/users/:id',userController.updateItemPatch)




module.exports=router