const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    snsId:{
        type:String,
        unique:true,
        required:true,
        maxlength: 30,
    },
    password:{
        type:String,
        required:true,
        maxlength:200,
    },
    email:{
        type:String,
        maxlength:50,
        unique:true,
        sparse:true, // sparse >> 비어있다
    },
    nick:{
        type:String,
        maxlength:30,
        required:true
    },
    phonNB:{
        type:String,
        maxlength:20,
    },
    create_at:{
        type:Date,
        default: Date.now
    },
    delete_at:{
        type:Date,
        default:null
    },
},{timestamps:false,
    collaction:'users'
})

const User = mongoose.model('User',userSchema)
module.exports = User;