const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    otp:{
        type:Number,
    },
    otpExpire:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)