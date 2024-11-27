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


const parseCookies = (cookie = '') => {// {'name=dongjin; email=aaaa@aaaa;.....'} 형태로 들어옴
    cookie
    .split(';')  // ['name=dong','email=aaaa@aaaa.com ....] 형태로 스플릿
    .map(v=> v.split('=')) // [[name,dongjin],[email,aaaaa@aaaa.com]] 형태로 스플릿
    .reduce((acc, [k,v])=>{
        acc[k.trim()] = decodeURIComponent(v);
        return acc; // {name : 'dongjin', email:aaaa@aaaa.com} << obj 형태로 만들어줌
    }, {}); // iterable
}


http.createServer(async(req,res)=>{
    const cookies = parseCookies(req.headers.cookie); // 파싱한 쿠키를 cookies 에 담음
    if (req.url.startsWith('/login')) { // req.url >> /login?name=dong 전체 url이 나옴
        const url = new URL(req.url, 'http://localhost:8084'); // 기본 도메인을 (http://local:8084) 을 url 로 만들어줌
        const name = url.searchParams.get('name'); // 쿼리문에 있는 name 의 키를 사용한 밸류값을 가져옴
        const expires = new Date(); // 쿠키의 유효기간 new Date()<<현재시간

        expires.setMinutes(expires.getMinutes() + 3); // 쿠키를 new Date() 로부터 3분 동안 쿠키를 가지고 있음
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, // HttpOnly << Http로만 쿠키에 접근을 하도록 함
        });
        res.end();
    } else if (cookies.name) {
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf8'});
        res.end(`${cookies.name}님 안녕하세요`);
    }else {
        try {
            const data = await fs.readFile(path.join(__dirname,'cookie.html'));
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(data);
        } catch (err) {
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf8'})
            res.end(err.message);
        }
    }
})
.listen(8084,()=>{
    console.log('8084번 포트에서 서버 대기')
})