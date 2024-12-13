const express = require('express');
const { isLoggedIn,isNotLoggedIn } = require('../middle');
const {renderProfile, renderJoin, renderMain} = require('../controller/page')
const router = express.Router();


router.get('/profile',isLoggedIn, renderProfile)


router.get('/join',isNotLoggedIn,renderJoin)

router.get('/',renderMain);

// router.get('/',(req,res,next)=>{
//     res.end('한조 대기중')
// })

module.exports = router