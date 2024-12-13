const Post = require('../schemas/post')
const User = require('../schemas/users')
const Hashtag = require('../schemas/hashtags');
const { post } = require('../routes/pageRouter');

//프로필 페이지 렌더링
exports.renderProfile = (req,res) =>{
    res.render('profile',{title:'내정보-sns'})
};

exports.renderJoin = (req,res) =>{
    res.render('join',{title:'회원가입'})
};

exports.renderMain = async(req,res,next)=>{
    try{
        const posts = await Post.find()
        .populate({path:"user",select:'snsId nick'})
        .sort({createAt:-1});
        
        res.json({title:'SNS-Main',twits:posts})
    }catch(err){
        console.error(err)
        next(err)
    }
}