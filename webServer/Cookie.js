const http = require('http');
const fs = require('fs').promises;
const path = require('path');;

// http.createServer((req,res) =>{
//     console.log(req.url, req.headers.cookie);
//     res.writeHead(200, {'Set-Cookie':'mycookie=test'});
//     res.end('<h1>hello cookie</h1>');
// }).listen(8080, ()=>{
//     console.log('8080번 포트  서버')
// })


// const parseCookies = (cookie = '') => // 'name=dongjin; email=aaaa@aaaa;.....' 형태로 들어옴
//     cookie
//     .split(';')  // ['name=dong','email=aaaa@aaaa.com ....] 형태로 스플릿
//     .map(v=> v.split('=')) // [[name,dongjin],[email,aaaaa@aaaa.com]] 형태로 스플릿
//     .reduce((acc, [k,v])=>{
//         acc[k.trim()] = decodeURIComponent(v);
//         return acc; // {name : 'dongjin', email:aaaa@aaaa.com} << obj 형태로 만들어줌
//     }, {}); 

const parseCookies = (cookie = '') =>
    cookie
      .split(';')
      .map(v => v.split('='))
      .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
      }, {});



http.createServer(async(req,res)=>{
    const cookies = parseCookies(req.headers.cookie); // 리퀘스트를 받을때 마다 실행
    if (req.url.startsWith('/login')) { // req.url >> /login 으로 시작하는지 확인
        const url = new URL(req.url, 'http://localhost:8084'); // 기본 도메인을 (http://local:8084) 을 url 로 만들어줌
        console.log(url)
        const name = url.searchParams.get('name'); // 쿼리문에 있는 name 의 키를 사용한 밸류값을 가져옴
        const expires = new Date(); // 쿠키의 유효기간 new Date()<<현재시간

        expires.setMinutes(expires.getMinutes() + 3); // 쿠키를 new Date() 로부터 3분 동안 쿠키를 가지고 있음
        res.writeHead(302, {
            Location : '/', // 루트페이지로 리다이렉트
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, // 쿠키를 생성 하고 헤더 정보에 들어감   
        }); // 쿠키,url로 변환하기 위해 아스키 코드로 변환시킴  // HttpOnly << Http로만 쿠키에 접근을 하도록 함 //Path >> 쿠키가 가지고 있는 path 정보
        res.end();
    } else if (cookies.name) { // cookie 를 가지고 있으면 실행됨
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else {
        try {
            const data = await fs.readFile(path.join(__dirname,'cookie.html'));
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(data); // 리스폰스 끝
        } catch (err) {
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf8'})
            res.end(err.message);
        }
    }
})
.listen(8084,()=>{
    console.log('8084번 포트에서 서버 대기')
})