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
        else if (req.method === 'POST') { 
            if (req.url === '/user') {
                let body ='';
                req.on('data', (data)=>{ // data는 조각 데이터 >> 클라이언트가 입력한 정보가 json 형태로 저장 >> jsaon문자열이 스트림 조각으로 나뉘어 조각 단위로 전달되고 이조각들이 data에 담김
                    body +=data; // 조각(data) 을 body에 누적하면서 최종적으로 완전한 json 문자열을 생성 ex >> {"name":"김덕봉"}
                }) 
                return req.on('end',()=>{
                    console.log('POST 본문(body) : ', body); 
                    const {name} = JSON.parse(body); // json 형태의 데이터를 파싱하여 자바스크립트의 obj 형태로 만듬
                    // body 에 들어있는 json문자열 ex >> '{"name":"김덕봉"}' 을 오브젝트로 변환 >> {name:"김덕봉"} 변환한 오브젝트에서 name 의 키가 가지고 있는 밸류 값을 name 변수에 담음 >> name = '김덕봉'
                    const id = Date.now(); // 고유한 id를 생성 // 현재 시간기반
                    users[id] = name; // 현재 시간기반으로 저장된 id 를 오브젝트의 키값으로 사용하여 users={} 에 저장 // users = {id(Date.now()):'김장두')} 가 오브젝트로 저장됨
                    res.writeHead(201, {'Content-Type':'text/plain;, charset=utf-8'})
                    res.end('등록성공')
                })
            }

        }
        else if (req.method === 'PUT') { 
            if(req.url.startsWith('/user/')){ // 클라이언트가 보낸 요청 URL 이 특정 경로로 시작하는 확인하는 조건
                const key = req.url.split('/')[2];// user/id << Data.now() 로 생성된 값 <<  선택을 하고 key 라는 변수에 담음
                let body = ''; 
                req.on('data',(data)=>{
                    body+=data;
                });
                return req.on('end',()=>{
                    console.log('PUT 본문(body):',body);
                    users[key] =JSON.parse(body).name; // 변수로 저장된 key 값에 있는 name 을 수정 ex) id(Date.now()):'김덕봉' >> id(Date.now()):'김장두' 
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