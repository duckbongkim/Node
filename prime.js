// const min = 2;
// const max = 10000000;
 let primes = []

function findPrime(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = 2; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i)
        }
        isPrime = true;
    }
}

// console.time('prime');
// findPrime(min, max);
// console.timeEnd('prime');
// console.log(prime.length)

module.exports={ findPrime,primes }