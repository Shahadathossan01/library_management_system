const router=require('express').Router()
const authRoutes=require('./auth')
const bookRoutes=require('./book')

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1',bookRoutes)

module.exports=router;
