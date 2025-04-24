const router=require('express').Router()
const {controllers:bookController}=require('../api/v1/book')
const authenticate = require('../middleware/authenticate')

router
    .post('/books',bookController.create)
    .get('/books',bookController.findAllItems)
    .get('/books/:id',bookController.findSingleItem)
    .put('/books/:id',bookController.updateItemPut)
    .patch('/books/:id',bookController.updateItemPatch)
    .delete('/books/:id',bookController.removeItem)
    .post('/books/:id/reviews',authenticate,bookController.createReviewForBook)
    .get('/books/:id/reviews',bookController.findReviewsByBookId)

module.exports=router