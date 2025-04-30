const router=require('express').Router()
const authRoutes=require('./auth')
const bookRoutes=require('./book')
const reviewRoutes=require('./review')
const bookIssueRoutes=require('./bookIssue')
const userRoutes=require('./user')
router.use('/api/v1/auth',authRoutes);
router.use('/api/v1',bookRoutes)
router.use('/api/v1',reviewRoutes)
router.use('/api/v1',bookIssueRoutes)
router.use('/api/v1',userRoutes)

module.exports=router;
