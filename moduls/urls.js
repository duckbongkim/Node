const url = require('url')

const { URL } = url
const newUrl = new URL('https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=%ED%91%B8%ED%8B%B4')

console.log(newUrl)
// 유저의 쿼리스트링을 파싱 할때  많이 사용됨
console.log(newUrl.searchParams.getAll('where'))