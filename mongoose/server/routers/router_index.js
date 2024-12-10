const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/',async(req,res,next)=>{
    try {
        const users = await User.find({})
        res.render('Mongoose',{users})
    } catch(err){
        console.error(err)
    }
})

module.exports = router;