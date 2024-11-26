const fs = require('fs').promises
//fs는 기본 콜백방식 .promises를 붙여야 프로미스 방식으로 사용할수있음

const context = "soxl 다운!"


//promises 형태의 사용법
//            파일명,    입력할내용, 인코딩 규칙을 설정
// fs.writeFile('test.txt', context, 'utf8')
//     .then(()=>{
//         console.log('파일쓰기 완료')
//     })
//     .catch((err) =>{
//         console.error(err)
//     })
// .catch << 항상 만들어야 함

// const fs = require('fs');

// // 비동기 방식으로 파일 읽기
// fs.readFile('file1.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// // 동기 방식으로 파일 읽기
// const data = fs.readFileSync('file2.txt', 'utf8');
// console.log(data);


//async await 
//비동기적 함수를 동기적방식으로 작성
//비동기적 함수가 있어야 async를 사용할수 있음
async function writeFile(path,context) {
    try{
        await fs.writeFile(path, context, 'utf8'); // await > 비동기적으로 수행하는 프로미스 구간을 표시해줌
        // fs.writeFile 구간에(const fs = require('fs').promises) 프로미스를 사용했기 때문에 await 을 붙여 프로미스 구간을 알려줌
        console.log('파일쓰기 완료')
    } catch(err) {
        console.log('파일쓰기 실패',err)
    }
}

writeFile('./test.txt',context)
