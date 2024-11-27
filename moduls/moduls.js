const os = require('os')
const path = require('path')

// console.log(process.cwd()) // 현재 경로를 알려주는 함수

// console.log(process.pid) // 프로세스의 ID 를 알려주는 함수

// console.log(process.version) // Node 의 버전을 알려주는 함수

// console.log(process.arch) // cpu 아키텍쳐를 알려주는 함수

// console.log(process.platform)// pc 의 운영체제를 알려주는 함수



// console.log(os.arch()) // cpu 아키텍쳐

// console.log(os.platform()) // 운영채재

// console.log(os.type())

// console.log(os.hostname()) // 시스템 호스트 이름

// console.log(os.cpus()) // cpu 정보

// //메모리(RAM)
// console.log(os.freemem()/(1000*1000*1000))
// console.log(os.totalmem()/(1000*1000*1000))


// 경로상의 directory 부분 반환
// console.log(path.dirname(process.cwd()))
console.log(path.dirname('C:/Users/projects/func.js'))

// 경로상의 파일의 확장자 부분 반환
console.log(path.extname('C:/Users/projects/func.js'))
// 경로상의 파일의 이름반환(두번째 인수 : 제거할 확장자)
console.log(path.basename('C:/Users/projects/func.js'))
console.log(path.basename('C:/Users/projects/func.js','.js'))

//입력한 인수를 path 정보로 반환 (상대경로의 path 를 만들대 사용)
console.log(path.join('User','projects','func.js'))

// 현재 위치부터의 절대경로를 만들대 사용
console.log(path.resolve('User','projects','func.js'))
