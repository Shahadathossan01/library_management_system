const router=require('express').Router()
const {controllers:bookController}=require('../api/v1/book')
const ownerShip = require('../api/v1/book/middleware/ownerShip')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const upload = require('../middleware/multer.middleware')

router
    .post('/books',authenticate,authorize(['admin']),upload.single('image'),bookController.create)
    .get('/books',bookController.findAllItems)
    .get('/books/:id',bookController.findSingleItem)
    .put('/books/:id',authenticate,authorize(['admin']),bookController.updateItemPut)
    .patch('/books/:id',authenticate,authorize(['admin']),bookController.updateItemPatch)
    .delete('/books/:id',authenticate,authorize(['admin']),ownerShip('Book'),bookController.removeItem)
    .post('/books/:id/reviews',authenticate,authorize(['user']),bookController.createReviewForBook)
    .get('/books/:id/reviews',bookController.findReviewsByBookId)

module.exports=router