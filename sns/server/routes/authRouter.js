const express = require('express')

const { isLoggedIn, isNotLoggedIn} = require('../middle/index')
const {join, login, logout} = require('../controller/auth')

const router = express.Router();

// POST /auth/join >> 회원가입
//isNotLogedIn << 미들웨어
//join << 컨트롤러
router.post('/join',isNotLoggedIn,join)


// POST /auth/login >> 로그인
//isNotLogedIn << 미들웨어
//login << 컨트롤러
router.post('/login',isNotLoggedIn,login)


// GET /auth/logout >> 로그아웃
//isLoggedIn << 미들웨어
//logout << 컨트롤러
router.get('/logout',isLoggedIn,logout)


module.exports = router