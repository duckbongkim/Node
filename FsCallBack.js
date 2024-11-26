const fs = require('fs')

// fs.readFile('./sample.txt', (err, data) =>{
//     if(err) {
//         throw err;
//     }
//     console.log(data) // 데이터를 가져오기를 수행한 후 data
//     console.log(data.toString()) // 해당 데이터의 값을 출력
// })

fs.promises.readFile('./sample.txt')
    .then((data)=>{
        console.log(data)
        console.log(data.toString())
    })
    .catch((err)=>{
        console.error(err)
    })