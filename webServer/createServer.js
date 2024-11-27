const http = require('http');

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
    res.write('<h1>hello</h1>')
    res.end('<p>Node Server</p>')
}).listen(8080,()=>{
    console.log('8080 포트에서 서버 대기중')
})

// port > 데이터를 주고받을수 있는 통로 port 마다 각각의 앱을 구동할수 있음
// port 를 다르게 하면 여러게의 서버를 만들수있다.

http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
    res.write('<h1>hello</h1>')
    res.end('<p>welcome 8081</p>')
}).listen(8081,()=>{
    console.log('8081 포트에서 서버 대기중')
})