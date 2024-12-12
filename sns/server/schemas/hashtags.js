const mongoose = require('mongoose')

const hashtagSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        maxlength:20,
    },
},{timestamps:true})

const Hashtag = mongoose.model('Hashtag',hashtagSchema)

module.exports = Hashtag