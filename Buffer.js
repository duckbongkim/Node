//2진data 의 처리에 유용, 저용량 data 처리에 유용

const buffer = Buffer.from('Hello world')

// console.log(buffer) // buffer 의 내용 출력
// console.log(buffer.length) // buffer 의 길이 출력
// console.log(buffer.toString()) // 버퍼를 문자열로 변환

const arr = [Buffer.from('SOXL'),Buffer.from('아 제발 올라라'),Buffer.from('100 가즈아')]
const bufferSoxl = Buffer.concat(arr)

console.log(bufferSoxl.toString())

const buffer3 = Buffer.alloc(5)
console.log(buffer3)