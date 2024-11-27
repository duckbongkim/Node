const {odd, even} = require('./var')

function A(num){
    if (num % 2) {
        return odd
    }
    else {
        return even
    }
}

module.exports=A;
