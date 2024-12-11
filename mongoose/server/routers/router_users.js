const express = require ('express')
const User = require('../models/users')
const Comment = require ('../models/comment')

const router = express.Router();

router.route('/')
.get(async(req,res,next)=>{
    try{
        const users = await User.find({});
        
        res.json(users)
    }catch(err){
        console.error(err)
        next(err)
    }
})

.post(async(req,res,next)=>{
    try{
        const users = await User.create({
            name: req.body.name,
            age:req.body.age,
            comment: req.body.comment,
            married: req.body.married
        })
        
        res.end()
    }catch(err){
        console.error(err)
    }
})

router.get('/:id/comments',async(req,res,next)=>{
    try {
        const comment = await Comment.find({
            commenter: req.params.id
             })
             .populate('commenter')
             console.log(comment)
             res.json(comment)
    } catch(err) {
        console.error(err)
    }
})




module.exports = router
