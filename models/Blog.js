const mongoose = require('mongoose')

const blogSchema= mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    tags:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        require:true,
    },
},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)