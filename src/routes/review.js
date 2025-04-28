const router=require('express').Router()
const {controllers:reviewController}=require('../api/v1/review')
const authenticate = require('../middleware/authenticate')

router
    .post('/reviews',authenticate,reviewController.create)
    .get('/reviews',reviewController.findAllItems)
    .patch('/reviews/:id',reviewController.updateItemPatch)
    .delete('/reviews/:id',reviewController.removeItem)



module.exports=router