const express = require("express");
const router = express.Router()
const Comment = require("../models/comment") // 사용할 모델
const User = require("../models/users");

router.get('/',async(req,res,next)=>{
    try{
        const comments = await Comment.find({})
        console.log(comments)
        res.json(comments)
    } catch(err) {
        console.error(err)
        next(err)
    }
})

// router.post('/',async(req,res,next)=>{
//     try {
//     const comment = await Comment.create({
//         commenter: req.body.userid,
//         comment: req.body.comment
//     })
//     res.end()
//     }catch(err){
//         console.error(err)
//         next(err)
//     }
// })

router.post('/',async(req,res,next)=>{
    try{
        const userId = await User.findOne({name:req.body.userid})
        console.log(userId)
        const comment = await Comment.create({
            commenter : userId._id,
            comment: req.body.comment
        })
        res.json(comment)
    }catch(err){
        console.error(err)
        next(err)
    }
})



router.route('/:id')
.patch(async(req,res,next)=>{
    try{
        const result = await Comment.updateOne({
            _id:req.params.id
        },
       { comment:req.body.text})
    res.json(result)
    }catch(err){
        console.error(err)
        next(err)
    }
})

.delete(async(req,res,next)=>{
    try{
        await Comment.deleteOne(
            {_id:req.params.id},
        )
        res.end()
    } catch(err){
        console.error(err)
        next(err)
    }
})






module.exports = router;














