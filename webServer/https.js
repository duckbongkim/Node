const https = require('https');
const fs = require('fs');

// readFileSync 동기적으로 처리 서버가 만들어질때 한번 만들어지고 끝
// 서버가 열리는 과정은 i/o 가 없기때문에 동기적으로 하는게 효율적
// 동기적으로 만들면 추후 문제가 발생시 해당 문제를 찾기가 쉬움
// 비동기는 리소스를 효율적으로 사용  i/o 가 많을것들을 비동기적으로 처리하면 효율성이 증가함
https.createServer(
    {cert:fs.readFileSync('도메인 인증서 경로'),
        key:fs.readFileSync('도메인 비밀키 경로'),
     ca : [
        fs.readFileSync('상위 인증서 경로'),
     ],  

       },(req,res)=>{

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server!</p>');

}).listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });