// 필요한 모듈 불러오기
//설정 값들은 스크립트 위에 작성
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app =express(); // 서버 생성

//PORT 설정
app.set('port',process.env.PORT || 3000);


//(공통)미들웨어
//morgan 사용자의 어떤 요청이든 감지
// 리퀘스트와 리스폰스 사이에 있어야하기 때문에 공통미들웨어 위에 작성
app.use(morgan('combined'))

//라우터
app.get('/',(req,res)=>{
    // res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    res.send('안녕하세요!')
}); // res.send>> 리스폰스를 보냇기 때문에 아래 라우터는 실행이 안됨

// app.get('/',(req,res)=>{
//     res.send('안녕하세요2!')
// });




app.get('/category/',(req,res)=>{
    res.send('category')
})

app.get('/category/note',(req,res)=>{
    res.send('note')
})

app.get('/category/book',(req,res)=>{
    res.send('book')
})


app.get('/user',(req,res)=>{
    res.send("user Info")
})


// /* >> /category/ 해당 라우터 뒤에 어떤 라우터가 들어오더라도 res.send를 처리함
app.get('/category/*',(req,res)=>{
    res.send('카테고리')
})

app.get('*',(req,res)=>{
    res.send('404 에러 발생')
})


//서버 실행
// listes 은 이벤트 리스너 실행되는 코드를 계속 실행할수있게함 
// 요청을 받아주고 응답을 주는 역할을 함
app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 서버 대기중`)
})



