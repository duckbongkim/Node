const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')


const app  = express(); // 서버생성

// const PORT = process.env.PORT || 3000; //포트 설정

app.set('PORT', process.env.PORT || 3000) //포트 설정

// morgan 미들웨어 사용

const logStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(morgan('combined', {stream: logStream}))

//라우터 설정
app.get('/',(req,res)=>{
    res.send('dongjin');
});
app.get('/html',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
})



// app.listen(PORT,()=>{
//     console.log("3000번 포트에서 서버 대기중")
// })

app.listen(app.get('PORT'),()=>{
    console.log(`${app.get('PORT')}번 포트에서 서버 대기중`)
})
