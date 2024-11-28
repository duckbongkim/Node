const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`); // pid >> 프로세스의 id
    const numCpus = os.cpus().length
    for (let i=0; i<numCpus; i++){ // cpu의 갯수만큼 워커 생성
        cluster.fork()
    }
    cluster.on('exit',(worker,code, signal)=>{
        console.log(`${worker.process.pid} 번 워커가 종료`)
        console.log('code',code, 'signal',signal);
        // cluster.fork();
    });
} else {
    http.createServer((req,res)=>{
        res.writeHead(200, {'Content-type':'text/html; charset=utf8'});
        res.end('<h1>클러스터</h1>')
        setTimeout(()=>{
            process.exit(1);
        }, 3000) // 3초에 하나씩 워커 종료
    }).listen(8080);
    console.log(`${process.pid}번 워커 실행`)
}