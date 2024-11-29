// dotenv
require('dotenv').config(); // dotenv초기화

// 필요한 모듈 불러오기
//설정 값들은 스크립트 위에 작성
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app =express(); // 서버 생성
const cookieScret = process.env.COOKIE_SECRET

//PORT 설정
app.set('port',process.env.PORT || 3000);


//(공통)미들웨어
//morgan 사용자의 어떤 요청이든 감지
// 리퀘스트와 리스폰스 사이에 있어야하기 때문에 공통미들웨어 위에 작성

// 미들웨어 인수는 req,res,next // next 를 인수로 주지 않으면 다음 미들웨어가 실행이 안됨
// 모듈로 불러오는 미들웨어는 next 가 포함되어있지만 포함이 되어있지 않은 미들웨어에서는 next를 인수로 줘야함
app.use((req,res,next)=>{
    console.log('내가 만든 미들웨어')
    const error = new Error("에러 발생")
    error.status = 503
    next(error)
})

app.use(morgan('combined'))

app.use(cookieParser(cookieScret)) // 모든 쿠키에 대해서 사용함.
app.use(session({
    secret:process.env.SESSION_SCRET,
    resave: false,
    saveUninitialized: true,
    cookie :{maxAge:60000, httpOnly:true }
})) // 브라우저 마다 세션이 다르게 생성됨

app.use(express.static(path.join(__dirname,'static','imgs')))

// 에러 미들웨어
app.use((err,req,res,next)=>{
    res.status(err.status || 500).send(err.message)
})

//라우터
app.get('/session',(req,res,next)=>{
    if (req.query.skip) { // /session?skip=true
        return next('route')
    } else {
    req.session.user = {name:'dongjin', role:'admin',}
    res.send("세션정보 저장완료")
    }
})

app.get('/session',(req,res)=>{
    res.send('다른라우터 동작')
})

app.get('/session/read',(req,res)=>{
    if(req.session.user) {
        res.send(`세션 정보 : ${req.session.user.name}`)
    } else {
        res.send('세션정보가 없습니다.')
    }
})

app.get('/session/clear',(req,res)=>{
    // req.session.destroy()//세션 정보삭제 세션을 유지
    res.clearCookie('connect.sid')
    res.send('세션 삭제')
})

// app.get('/',(req,res)=>{
//     res.cookie('name','dongjin',{
//         maxAge : 60000,
//         httpOnly : true,
//         path:'/',
//         signed: true
       
//     })
//     res.send('<h1>쿠키생성 완료</h1>')
// }); // res.send>> 리스폰스를 보냇기 때문에 아래 동일한 라우터는 실행이 안됨

app.get('/cookie/read/', (req, res)=>{
    const userCookie = req.signedCookies.name;
    if(userCookie) {
        console.log(req.signedCookies)
        res.send(`쿠키는 ${userCookie}`)
        console.log(req.signedCookies)
    } else {
        res.send('쿠키가 없습니다.')
    }
})

// app.get('/',(req,res)=>{
//     res.send('안녕하세요2!')
// });

// app.get('/',(req, res)=> {
//     console.log('Cookies: ', req.cookies)
//     console.log('Signed Cookies: ', req.signedCookies)
//     res.send("cookieParser")
//   })

app.get('/user',(req,res)=>{
    res.send("user Info")
})

app.get('/category/',(req,res)=>{
    res.send('category')
})

app.get('/category/note',(req,res)=>{
    res.send('note')
})

app.get('/category/book',(req,res)=>{
    res.send('book')
})

// /* >> /category/ 해당 라우터 뒤에 어떤 라우터가 들어오더라도 res.send를 처리함
app.get('/category/*',(req,res)=>{
    res.send('카테고리')
})


// app.get('*',(req,res)=>{
//     res.send('404 에러 발생')
// })





//서버 실행
// listes 은 이벤트 리스너 실행되는 코드를 계속 실행할수있게함 
// 요청을 받아주고 응답을 주는 역할을 함
app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 서버 대기중`)
})



