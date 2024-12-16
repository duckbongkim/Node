const express = require('express')
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const { isLoggedIn } = require('../middle');
const {afterUploadImage ,uploadPost,updatePost,deletePost} = require('../controller/post')


const router = express.Router()

try {
    fs.readdirSync('uploads') // 폴더가 있는지 확인
}catch(err){ 
    console.error('uploads 폴더가 없어 폴더를 생성합니다')
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/')
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext)+Date.now()+ext)
        }
    }),
    limits: {fileSize: 5*1024*1024}
})


// post/img
router.post('/img',isLoggedIn,upload.single('img'),afterUploadImage);
 

//post
const upload2 = multer()
router.post('/',isLoggedIn,upload2.none(),uploadPost);

//post/update
router.post('/update/:postId',isLoggedIn,upload2.none(),updatePost)

//post.delete
router.post('/delete/:postId',isLoggedIn,deletePost)


module.exports = router