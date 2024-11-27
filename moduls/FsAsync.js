const fs = require('fs');

// console.log('시작')
// fs.readFile('./sample.txt','utf8',(err, data) =>{
//     if(err) throw err;
//     console.log('1번', data.toString())
// })
// console.log('끝')


console.log('시작');
(async() => {
    try{
        
        const data1 = await fs.promises.readFile('./sample.txt','utf8');
        console.log('1번',data1,toString());

        const data2 = await fs.promises.readFile('./sample.txt','utf8');
        console.log('2번',data2,toString());

        const data3 = await fs.promises.readFile('./sample.txt','utf8');
        console.log('3번',data3,toString());

        const data4 = await fs.promises.readFile('./sample.txt','utf8');
        console.log('4번',data4,toString());

    }catch{ (err) => {
        console.error('에러발생',err);
    }
    }
})();
console.log('끝');


// fs.readFile('./sample.txt',(err, data)=>{
//     if (err) {throw err}
//     console.log('1번',data.toString())
// });

// fs.readFile('./sample.txt',(err, data)=>{
//     if (err) {throw err}
//     console.log('2번',data.toString())
// });


// fs.readFile('./sample.txt',(err, data)=>{
//     if (err) {throw err}
//     console.log('3번',data.toString())
// });


// fs.readFile('./sample.txt',(err, data)=>{
//     if (err) {throw err}
//     console.log('4번',data.toString())
// });
// 끝나는(작업의) 순서를 보장할수 없다.
// 동기함수가 끝나야 비동기함수가 실행됨


// const data1 = fs.readFileSync('./sample.txt','utf8');
// console.log('1번',data1,toString());

// const data2 = fs.readFileSync('./sample.txt','utf8');
// console.log('2번',data2,toString());

// const data3 = fs.readFileSync('./sample.txt','utf8');
// console.log('3번',data3,toString());

// const data4 = fs.readFileSync('./sample.txt','utf8');
// console.log('4번',data4,toString());
// Sync를 붙이게 되면 동기적으로 실행됨
// 백그라운드로 호출이 안됌

