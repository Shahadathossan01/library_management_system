const router=require('express').Router()
const {controllers:reviewController}=require('../api/v1/review')
const ownerShip = require('../api/v1/review/middleware/ownerShip')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router
    .post('/reviews',authenticate,authorize(['user']),reviewController.create)
    .get('/reviews',reviewController.findAllItems)
    .patch('/reviews/:id',authenticate,authorize(['user','admin']),reviewController.updateItemPatch)
    .delete('/reviews/:id',authenticate,authorize(['user','admin']),ownerShip('Review'),reviewController.removeItem)
    .get('/reviews/:id',reviewController.findSingleItem)
    .get('/reviews/:id/book',reviewController.findBookByReviewId)
    .get('/reviews/:id/author',reviewController.findAuthorByReviewId)


module.exports=router