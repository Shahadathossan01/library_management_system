const express=require('express')
const applyMiddleware = require('./middleware')

const app=express()
applyMiddleware(app)


app.get('/health',(req,res,next)=>{
    try{
        res.status(200).json({health:'OK'})
    }catch(e){
        next(e)
    }
})

app.use((error,_req,res,_next)=>{
    console.log(error)
    const message=error.message?error.message:'Server Error Occurred';
    const status=error.status?error.status:500;
    res.status(status).json({message})
})

module.exports=app;