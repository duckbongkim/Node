const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// multer
const storage = multer.diskStorage({
    destination : './uploads/',
    filename : (req, res, cb) =>{
        cb(null, `${Date.now()}-${res.originalname}`)
    }
})

const upload = multer({storage})
// upload.single('image') 폼데이터를 저장 하는 역할
router.post('/upload', upload.single('image'), (req, res)=>{
    const imageUrl = `uploads/${req.file.filename}`
    res.json({ imageUrl})
    console.log(imageUrl)
})

router.get('/',(req,res)=>{
    const dirPath = path.join(__dirname,'../uploads')

    fs.readdir(dirPath,(err, files)=>{ //uploads 안에 있는 파일이름을  배열형태로 가져옴
        if(err) {
            return res.status(500).json({error:'디렉토리 없음'})
        }

        const imageUrls = files.map(file=>`/uploads/${file}`) // 이미지 파일들의 url을 만들어줌
        console.log(files)
        res.json(imageUrls)
    })
})




module.exports = router;