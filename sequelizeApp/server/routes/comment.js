// const express = require('express');
// const router = express.Router();
// const Comment = require('../models/comment')
// const User = require('../models/users')

// router.route('/')
// .get(async (req,res,next)=>{
//     try {
//         const comments = await Comment.findAll(
//             {
//                 include: {
//                     model:User,
//                     attributes:['name']
//                 }
//             }
//         )
//         console.log(comments.User)
//         res.json(comments)
//     }catch(err){
//         console.error(err)
//         next(err)
//     }
// })
// .post(async (req,res,next)=>{
//     try {
//       await Comment.create({
//             commenter: req.body.userid,
//             comment: req.body.comment
//     });
//         res.end()
//     } catch(err){
//         console.error(err)
//         next(err)
//     }
// })

// router.delete(`/:id`,(req,res)=>{
//     const {id} = req.params
   
// })

// module.exports = router;

const express = require("express");
const router = express.Router()
const Comment = require("../models/comment") // 사용할 모델
const User = require("../models/users");
const { where } = require("sequelize");

router.route('/')
.get(async (req,res,next)=>{
    try{
        const comments = await Comment.findAll(
            {
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        );
        console.log(comments)
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
} )
.post(async (req, res, next) =>{
    try{
        await Comment.create({
            commenter: req.body.userid,
            comment : req.body.comment
        })
        res.end();
    }catch (err) {
        console.error(err)
        next(err)
    }
})

router.route('/:id')
.patch( async(req,res,next)=>{
    try{
        const {id} = req.params;
        const {text} = req.body
        
        await Comment.update(
            {comment:text},
            {where:{id}}
        )
        res.end()
    } catch(err){
        console.error(err)
    }
})

.delete( async(req,res,next)=>{
   try{
    const {id} =req.params;
    await Comment.destroy(
        {where:{id}}
    )
    res.end()
   }catch(err){
    console.error(err)
   }
})












module.exports = router;