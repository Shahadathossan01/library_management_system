const {controllers:bookIssueController}=require('../api/v1/bookIssue')
const ownerShip = require('../api/v1/bookIssue/middleware/ownerShip')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const router=require('express').Router()

router
    .post('/bookIssues',authenticate,authorize(['user']),bookIssueController.create)
    .get('/bookIssues',authenticate,authorize(['admin']),bookIssueController.findAllItems)
    .patch('/bookIssues/:id',authenticate,authorize(['user','admin']),bookIssueController.updateItemPatch)
    .delete('/bookIssues/:id',authenticate,authorize(['admin','user']),ownerShip('BookIssue'),bookIssueController.removeItem)
    .get('/bookIssues/:id',authenticate,authorize(['user','admin']),bookIssueController.findSingleItem)
    .get('/bookIssues/:id/book',bookIssueController.findBookByBookIssueId)
    .get('/bookIssues/:id/author',bookIssueController.findAuthorByBookIssueId)



module.exports=router