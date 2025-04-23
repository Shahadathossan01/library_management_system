const router=require('express').Router()
const {controllers:bookController}=require('../api/v1/book')

router
    .post('/books',bookController.create)
    .get('/books',bookController.findAllItems)
    .get('/books/:id',bookController.findSingleItem)

module.exports=router