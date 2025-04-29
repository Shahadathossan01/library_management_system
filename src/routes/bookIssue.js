const {controllers:bookIssueController}=require('../api/v1/bookIssue')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const router=require('express').Router()

router
    .post('/bookIssues',authenticate,authorize(['user']),bookIssueController.create)


module.exports=router