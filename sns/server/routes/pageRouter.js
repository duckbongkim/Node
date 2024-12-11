const express = require('express')
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.end('한조 대기중')
})

module.exports = router