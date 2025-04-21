require('dotenv').config()
const http=require('http')
const app=require('./app')
const { connectDB } = require('./db')

const server=http.createServer(app)
const port=process.env.PORT || 4000

const main=async()=>{
    try{
        await connectDB()
        server.listen(port,async()=>{
            console.log(`Server is running in port: ${port}`)
        })
    }catch(e){
        console.log('Database Error')
        console.log(e)
    }
}

main()