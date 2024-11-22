const {odd, even} = require('./var')

function checkedOdd(num){
    if (num % 2) {
        return odd
    }
    else {
        return even
    }
}

module.exports=checkedOdd;
