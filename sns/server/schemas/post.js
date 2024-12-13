const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        maxlength: 300,
    },
    img:{
        type:String,
        maxlength: 300,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    hashtags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hashtag'
    }], // 하나의 게시물 안에 여러게가 들어오기 떄문에 배열로 작성
    likes:{
        type:Number,
        default:0,
    },
},{timestamps: true, collaction:'Posts'})

const Post = mongoose.model('Posts',postSchema)

module.exports = Post
