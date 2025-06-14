const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
    },
    otpExpire:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
    },
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)