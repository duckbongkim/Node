const {Worker, isMainThread, parentPort, workerData}=require('worker_threads')
// Worker > 새로운 worker thread를 생성
// isMainThread > 현재 우리가 사용하는 thread가 메인 thread인지 확인 (true/false)
// parentPort > 메인 thread와 다른 worker thread의 연결을 위해 사용
// workerData > 메인 thread에서 worker로 전달되는 데이터 저장
let {findPrime, primes} = require('./prime')

// findPrime(2,1000)
// console.log(primes.length)

//Worker thread 사용 // 쓰레드를 쪼개서 할일을 나눔 
// mainthread 는 관리자역할(워커 스레드의 할일을 분배해줌)

if (isMainThread) {
// 메인쓰레드가 할일을 정의함
const max = 50_000_000; //우리가 찾는 소수의 범위값
const min = 2; // 우리가 찾는 소수의 시작값
const threadCount = 6; // 실제로 일을 처리할 worker theards 의 개수
const threads = new Set(); // worker thread를 관리하고 추적하기 위한 객체
//Set >> 값의 중복을 허용하지 않는 집합(배열)
const range = Math.floor((max-min) / threadCount); //각 workers 의 처리할 숫자의 범위 나누기
let start = min // 시작값 초기화
console.time('prime')
//워커스레드 생성 작업
for (let i=0; i<threadCount; i++) {
    const wStart = start; // 현재 워커의 시작 숫자 (2부터 시작....3천 3백만 2....)
    threads.add(new Worker(__filename, {workerData:{start:wStart, range}})) // 워커 생성
    // __filename 현재 실행중인 스크립트 / workerData 각 스레드들의 작업범위를 정의
    start += range; // 다른 워커의 시작 숫자
}
//이벤트 핸들러
for (let worker of threads ) { // worker.on 이벤트 처리기
    worker.on('error',(e)=>{
        throw e; // 워커에서 에러 발생시 프로그램 종료
    });
    worker.on('exit',()=>{ 
        threads.delete(worker);// 워커가 종료되면 삭제
        if(threads.size === 0){ // 모든 워커가 종료된 상태
            console.timeEnd('prime'); // 최종 시간 측정
            console.log(primes.length); // 소수의 개수 
        } 
    });
    worker.on('message',(msg)=>{
        primes = primes.concat(msg) // 워커가 전달한 소수 배열을 메인 스래드 배열에 합산
        // concat >> 배열들을 병합 // msg 에 자신이 연산된 값을 전달
    });
}

}else {
    //각 워커들이 할일
    findPrime(workerData.start, workerData.range);
    parentPort.postMessage(primes);
    // parentPort>>다른 스레드 들이 메인스레드로 보낼때 사용 
}

