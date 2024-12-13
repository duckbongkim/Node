const Post = require('../schemas/post')
const Hashtags = require('../schemas/hashtags')


// 이미지 업로드시 해당 클라리언트 url로 전송
// 사진은 서버의 스토리지에 저장하고 path 정보만 클라이언트에 전송 >> 클라이언트가 게시글을 저장하면 db에 path 정보와 게시글 내용이 저장됨
exports.afterUploadImage = (req,res) =>{
    console.log(req.file)
    res.json({url:`/img${req.file.filename}`})
}

exports.uploadPost = async(req,res,next) =>{
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            user: req.user._id,
        })
        const hashtags = req.body.content.match(/#[^\s#]*/g)
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(async(tag)=>{
                    const title = tag.slice(1).toLowerCase();
                    let hash = await Hashtags.findOne({title})
                    
                    if(!hash) {
                        hash = await Hashtags.create({title})
                    }
                    return hash
                })
            );
            post.hashtags = result.map((hash)=> hash._id)
            await post.save();
        }
        res.redirect('/')
    }catch(err){
        console.error(err)
        next(err)
    }
}