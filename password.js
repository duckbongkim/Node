const crypto = require('crypto')

const hash = crypto.createHash('sha256').update('choidongjin').digest('hex');
const hash2 = crypto.createHash('sha256').update('a').digest('hex');


// console.log(hash)
// console.log(hash2)

//              비밀번호         , salt    , 반복횟수,길이,해시알고리즘
// crypto.pbkdf2('abcdegghijklmnop','addsalt', 250000, 64, 'sha512', (err, derivedKey)=>{
//     if(err) throw err;
//     console.log(derivedKey.toString('hex'))
// })



const algorithm = 'aes-256-cbc'; 
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// 암호화
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('이름여섯글자', 'utf8', 'base64');
encrypted += cipher.final('base64');

// 복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'base64', 'utf8');
decrypted += decipher.final('utf8');


console.log(encrypted)
console.log(decrypted)
