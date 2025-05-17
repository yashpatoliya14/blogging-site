const mongoose = require('mongoose')

const tempUserSchema= mongoose.Schema({
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
},{timestamps:true})

module.exports = mongoose.model('TempUser',tempUserSchema)