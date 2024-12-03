// dotenv
require('dotenv').config(); // dotenv초기화

// 필요한 모듈 불러오기
//설정 값들은 스크립트 위에 작성
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer')

//라우터 불러오기

const indexRouter = require('./Routers');
const userRouter = require('./Routers/user')

const app =express(); // 서버 생성
const cookieScret = process.env.COOKIE_SECRET

//PORT 설정
app.set('port',process.env.PORT || 3000);

// const storage = multer.diskStorage({
//     destination:(req, file, cb) => { // destination 파일의 저장경로
//         cb(null, 'uploads/')
//     },
//     filename: (req,file,cb) => { // 사용자가 업로드한 파일들의 이름이 겹칠경우 덮어쓰기 되기때문에 
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1e9) // 유니크한 값을 지정
//         cb(null, file.fieldname+'-'+uniqueSuffix+path.extname(file.originalname)) // 이미지의 이름 + 생성된 고유한 값 + 확장자명
//     }
// }); // 어디에 저장을 할지 결정하는 변수 생성 (multer의 저장위치 지정)



// const upload = multer({ // multer 안에 있는 single , array 들이 미들웨어
//     storage: storage,
//     limits: {fileSize:1024*1024*5},
// })

// // single file
// app.post('/upload', upload.single('file'), (req, res) =>{
//     console.log(req.file);
//     res.send(`File Upload Complate: ${req.file.filename}`)
// })


// '/upload',upload.array('files',5), (req,res)
//  요청    ,미들웨어                , 콜백(응답)

// app.post('/upload',upload.array('files',5), (req,res)=>{
//     console.log(req.files)
//     res.send(`Multiple File Upload`)
// })



//(공통)미들웨어

//morgan 사용자의 어떤 요청이든 감지
// 리퀘스트와 리스폰스 사이에 있어야하기 때문에 라우터 위에 작성

// 미들웨어 인수는 req,res,next // next 를 인수로 주지 않으면 다음 미들웨어가 실행이 안됨
// 모듈로 불러오는 미들웨어는 next 가 포함되어있지만 포함이 되어있지 않은 미들웨어에서는 next를 인수로 줘야함

// app.use((req,res,next)=>{
//     console.log('내가 만든 미들웨어')
//     const error = new Error("에러 발생")
//     error.status = 503
//     next(error)
// })

// body-parser 미들웨어
// express.jon // json 파싱을 해당 미들웨어서 실행함
// app.use(express.json());



//body.parser (urlencoded)
// app.use(express.urlencoded())


// 라우터 에서 사용할 미들웨어
app.use(morgan('combined'))
app.use(cookieParser(cookieScret)) // 모든 쿠키에 대해서 사용함.
app.use(session({
    secret:process.env.SESSION_SCRET,
    resave: false,
    saveUninitialized: true,
    cookie :{maxAge:60000, httpOnly:true }
})) // 브라우저 마다 세션이 다르게 생성됨

// app.use(express.static(path.join(__dirname,'public','imgs')))

// 에러 미들웨어
// app.use((err,req,res,next)=>{
//     res.status(err.status || 500).send(err.message)
// })

// app.post('/form',(req, res)=>{ 
//     console.log(req.body);
//     res.send(`데이터 처리 완료 : ${JSON.stringify(req.body)}`)
// }) // 클라이언트가 전달한 요청을 파싱하여 전달 

// app.post('/send-json',(req,res)=>{
//     const {name, age, gender} = req.body
//     console.log(req)
//     console.log(`Parsing Data: ${name}, ${age}, ${gender}`)
//     res.json({message: `Parsing Data: ${name}, ${age}, ${gender}`}); // message 를 index.html 에 리스폰스함
//     // json 으로 리스폰스함
// })
// index 는 디폴트 
// app.use(express.static(path.join(__dirname, 'public')))


// ------------------라우터--------------------------
// 라우터로 가는 코드

// 1. 기본 url
app.use('/',indexRouter)

//2. /user/ 다음에 나오는 url
app.use('/user',userRouter)

//에러처리 미들웨어
app.use((req,res,next)=>{
    res.status(404).send('Not Found')
})

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send(err.message);
})





//서버 실행
// listes 은 이벤트 리스너 실행되는 코드를 계속 실행할수있게함 
// 요청을 받아주고 응답을 주는 역할을 함
app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 서버 대기중`)
})



