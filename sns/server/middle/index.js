exports.isLoggedIn = (req,res,next) =>{
    //로그인 되어있는지 확인
    if(req.isAuthenticated()){
        next()
    } else {
        res.status(403).send('로그인이 필요합니다.')
    }
}

exports.isNotLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        next()        
    } else {
        res.status(403).json({message: "이미 로그인한 상태입니다."})
    }

}