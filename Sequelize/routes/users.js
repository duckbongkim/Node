const express = require('express');
const User = require('../models/users')
const Comment = require('../models/comment')
const router = express.Router()

// User 정보 처리형 API 목록
// 전체 사용자 조회
// 사용자 정보 입력
// 사용자 정보 수정
// 사용자 정보 삭제
// 특성 사용자 검색
// 사용자 ID를 이동한 코멘트 검색

router.route('/')
.get(async (req,res,next)=>{// User모델에 data 불러오기
    try {
        const users = await User.findAll();
        res.send(users) // 제이슨으로 바꾸기
    } catch(err) {
        console.error(err)
        next(err)
    }
})
.post(async(req,res,next)=>{ // User 모델에 데이터 입력요청
    try {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
            comment: req.body.comment,
        });
        console.log(user)
        res.end()
    } catch(err) {
        console.err(err)
        next(err)
    }
})

// id를 입력해서 해당 comment 데이터 가져오기
router.get('/:id/comments',async (req,res,next)=>{
    try{
        const comment = await Comment.findAll({
            include: {
                model:User,
                where: {id: req.params.id}
            },
        });
        console.log(comment);
        res.send(comment);
    }catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;