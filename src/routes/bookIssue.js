const {controllers:bookIssueController}=require('../api/v1/bookIssue')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const router=require('express').Router()

router
    .post('/bookIssues',authenticate,authorize(['user']),bookIssueController.create)
    .get('/bookIssues',bookIssueController.findAllItems)
    .patch('/bookIssues/:id',bookIssueController.updateItemPatch)
    .delete('/bookIssues/:id',bookIssueController.removeItem)
    .get('/bookIssues/:id',bookIssueController.findSingleItem)
    .get('/bookIssues/:id/book',bookIssueController.findBookByBookIssueId)



module.exports=router