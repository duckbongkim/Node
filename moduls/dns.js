const dns = require('dns')
const {error} = require('console')

// dns.lookup('wwww.naver.com',(err, address)=>{
//     if (err) throw err;
//     console.log(address)
// });

dns.reverse('223.130.200.219',(err,hostnames)=>{
    if (err) throw err;
    console.log(hostnames)
})