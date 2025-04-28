const router=require('express').Router()
const authRoutes=require('./auth')
const bookRoutes=require('./book')
const reviewRoutes=require('./review')
router.use('/api/v1/auth',authRoutes);
router.use('/api/v1',bookRoutes)
router.use('/api/v1',reviewRoutes)

module.exports=router;
