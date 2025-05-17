const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./routes/blog_route')
const dotenv = require('dotenv')
const userRouter = require('./routes/user_route')
const verifyToken = require('./middleware/verifyToken')
const cookieParser = require('cookie-parser')
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    const PORT = process.env.PORT || 8080
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(cookieParser())
    //routes
    app.use('/api/blog',verifyToken,blogRouter)
    app.use('/api/auth',userRouter)
    app.listen(PORT , (err)=>{
        if(!err){
            console.log("Server start at ",PORT)
        }
    })

})
.catch((err)=>{
    console.log('Mongodb connection unsuccessful',err)
})