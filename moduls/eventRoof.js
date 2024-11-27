// console.log('hello world')

// function thirdFunction(){
//     console.log('세번째 함수')
// };

// function firstFunction(){
//     setTimeout(()=>{
//         console.log('첫번째 함수') 
//     }, 1000)
//     secondFuntion();
// };

// function secondFuntion(){
//     setTimeout(()=>{
//         thirdFunction();
//     }, 2000)
//     console.log('두번째 함수')
// };


//  firstFunction();

// function run() {
//     console.log('3초 후 실행');
// }

// console.log('시작');
// setTimeout(run, 3000);
// console.log('끝');

//console.log('시작')
// setTimeout(firstFunction, 3000)
// setTimeout(secondFunction, 1000)
// setTimeout(thirdFunction, 2000)
//console.log('끝')


function longTask() {
    const start = Date.now() // 호출스택에 들어가는 순간 시간을 찍어요.
    while (Date.now() - start < 3000){

    }
    console.log("longTask 작업 완료")
}

function firstFunction(){
    setTimeout(()=>{
        console.log('첫번째 함수') 
    }, 1000)
};

console.log('시작')
firstFunction();
longTask();
console.log('끝')