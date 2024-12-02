// app.get('/session',(req,res,next)=>{
//     if (req.query.skip) { // /session?skip=true
//         return next('route')
//     } else {
//     req.session.user = {name:'dongjin', role:'admin',}
//     res.send("세션정보 저장완료")
//     }
// })

// app.get('/session',(req,res)=>{
//     res.send('다른라우터 동작')
// })

// app.get('/session/read',(req,res)=>{
//     if(req.session.user) {
//         res.send(`세션 정보 : ${req.session.user.name}`)
//     } else {
//         res.send('세션정보가 없습니다.')
//     }
// })

// app.get('/session/clear',(req,res)=>{
//     // req.session.destroy()//세션 정보삭제 세션을 유지
//     res.clearCookie('connect.sid')
//     res.send('세션 삭제')
// })

// // app.get('/',(req,res)=>{
// //     res.cookie('name','dongjin',{
// //         maxAge : 60000,
// //         httpOnly : true,
// //         path:'/',
// //         signed: true
       
// //     })
// //     res.send('<h1>쿠키생성 완료</h1>')
// // }); // res.send>> 리스폰스를 보냇기 때문에 아래 동일한 라우터는 실행이 안됨

// app.get('/cookie/read/', (req, res)=>{
//     const userCookie = req.signedCookies.name;
//     if(userCookie) {
//         console.log(req.signedCookies)
//         res.send(`쿠키는 ${userCookie}`)
//         console.log(req.signedCookies)
//     } else {
//         res.send('쿠키가 없습니다.')
//     }
// })

// // app.get('/',(req,res)=>{
// //     res.send('안녕하세요2!')
// // });

// // app.get('/',(req, res)=> {
// //     console.log('Cookies: ', req.cookies)
// //     console.log('Signed Cookies: ', req.signedCookies)
// //     res.send("cookieParser")
// //   })

// app.get('/user',(req,res)=>{
//     res.send("user Info")
// })

// app.get('/category/',(req,res)=>{
//     res.send('category')
// })

// app.get('/category/note',(req,res)=>{
//     res.send('note')
// })

// app.get('/category/book',(req,res)=>{
//     res.send('book')
// })

// // /* >> /category/ 해당 라우터 뒤에 어떤 라우터가 들어오더라도 res.send를 처리함
// app.get('/category/*',(req,res)=>{
//     res.send('카테고리')
// })


// app.get('*',(req,res)=>{
//     res.send('404 에러 발생')
// })
