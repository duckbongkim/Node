const express = require ('express')
const User = require('../models/users')
const Comment = require ('../models/comment')

const router = express.Router();

router.route('/')
.get(async(req,res,next)=>{
    try{
        const users = await User.find({});
        console.log(users)
        res.json(users)
    }catch(err){
        console.error(err)
        next(err)
    }
});

module.exports = router
