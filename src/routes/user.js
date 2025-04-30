const router=require('express').Router()
const {controllers:userController}=require('../api/v1/user')
const ownerShip = require('../api/v1/user/middleware/ownerShip')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router
    .get('/users',authenticate,authorize(['admin']),userController.findAllItems)
    .post('/users',authenticate,authorize(['admin']),userController.create)
    .get('/users/:id',authenticate,authorize(['admin']),userController.findSingleItem)
    .patch('/users/:id',authenticate,authorize(['admin']),userController.updateItemPatch)
    .delete('/users/:id',authenticate,authorize(['admin']),ownerShip('User'),userController.removeItem)
    .get('/users/:id/bookIssues',authenticate,authorize(['user','admin']),userController.findBookIssuesByUserId)




module.exports=router