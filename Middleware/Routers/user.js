const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('안녕하세요 사용자')
})

router.get('/:id', function(req, res) { // 라우트 매개변수 '/:id' >> /뒤에 어떤값이든 들어올수있음
	console.log(req.params, req.query);
    res.send('안녕하세요 사용자2')
});

router.get('/dongjin',(req,res)=>{
    res.send('최동진입니다.')
})


module.exports = router