const http = require('http');
const fs = require('fs').promises;
const path = require('path');// 경로설정

//users {id(Date.now()):최동진} 
const users = {}; // 데이터 저장소

http.createServer(async(req,res)=>{
    try{
        if(req.method === 'GET') {
            if(req.url ==='/') {
                const data = await fs.readFile(path.join(__dirname,'restFront.html')) 
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'}) // 헤더 정보를 보내줌
                return res.end(data)
            }else if (req.url === '/about'){
                const data = await fs.readFile(path.join(__dirname,'about.html')) 
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'}) // 헤더 정보를 보내줌
                return res.end(data)

            }else if (req.url === '/users'){
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'})
                return res.end(JSON.stringify(users))
                // return 나오면 함수를 빠져나감 
            }
            try {  // /도 /about도 /users도 아니면
                const data =await fs.readFile(path.join(__dirname,req.url));
                return res.end(data)
            } catch (err){ // 주소에 해당하는 라우트를 못찾았다는 에러를 표시
                console.error(err)
            }
        }
        // POST 요청으로 들어오면 입력받은 데이터를 Body에 넣겟다
        else if (req.method === 'POST') { // 어떤 url을 받을지 결정 //url 이 같아도 method 방식이 달라서 사용가능
            if (req.url === '/user') {
                let body ='';
                req.on('data', (data)=>{
                    body +=data;
                })
                return req.on('end',()=>{
                    console.log('POST 본문(body) : ', body); 
                    const {name} = JSON.parse(body); // name 이라는 key 에는 body 값이 들어감
                    const id = Date.now(); // 고유한 key 에 Date.now() >> 시간을 넣음
                    users[id] = name; 
                    res.writeHead(201, {'Content-Type':'text/plain;, charset=utf-8'})
                    res.end('등록성공')
                })
            }

        }
        else if (req.method === 'PUT') { // startsWith 시작하는 철자
            if(req.url.startsWith('/user/')){ 
                const key =req.url.split('/')[2];// user/id <<  선택
                let body = ''; 
                req.on('data',(data)=>{
                    body+=data;
                });
                return req.on('end',()=>{
                    console.log('PUT 본문(body):',body);
                    users[key] =JSON.parse(body).name; // 
                    res.writeHead(200, {'Content-Type':'text/plain;, charset=utf-8'});
                    return res.end(JSON.stringify(users))
                })
            }

        }
        else if (req.method === 'DELETE') {
            if(req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key]
                res.writeHead(200, {'Content-Type':'text/plain;, charset=utf-8'});
                return res.end(JSON.stringify(users))
            }
        }
        res.writeHead(404); // 요청에 없는 메소드로 접근했을때 404 에러를 띄움
        return res.end('Not Found')
    }
    catch(err) {
        console.error(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf8'})
    }
})
.listen(8080,()=>{
    console.log('8080port 서버 실행')
})

//1.if 문 >> method로 기준을 나눔
//2.if 문 >> 첫번째 라우터로 기준을 나눔