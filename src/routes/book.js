const router=require('express').Router()
const {controllers:bookController}=require('../api/v1/book')

router
    .post('/books',bookController.create)

module.exports=router