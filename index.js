const {odd, even} = require('./var')
const dong = require('./func')


function checkedStringOddorEven(str){
    if(str.length % 2){
        return odd
    }
    else {
        return even
    }
}
// console.log(odd)
console.log(dong(5))
console.log(checkedStringOddorEven('이건여섯글자'))

