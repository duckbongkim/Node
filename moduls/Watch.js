const fs = require('fs')


// 중요파일들을 감시 할수있음
fs.watch('./test.txt',(eventType, filename)=>{
    console.log(eventType, filename)
})