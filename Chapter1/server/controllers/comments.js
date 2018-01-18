// 이메일에서 gravatar아이콘 얻기
var gravatar = require('gravatar');
// 코멘트 모델 가져오기
var Comments = require('../models/comments');

//코멘트 목록
exports.list = function(req, res)
{
    // 코멘트 전체 목록을 날짜별 정렬
    Comments.find().sort('-created').populate('user', 'local.email').exec(function(error, comments){
        if (error) {
            return res.send(400, {message: error});
        }
        res.render ('comments', {
            title: 'Comments Page',
            comments: comments,
            gravatar: gravatar.url(comments.email, {s:'80', r:'x', d:'retro'}, true)
        });
    });
};

// 코멘트 작성
exports.create = function(req, res){
    // request body를 가진 코멘트 모델 생성하기
    var comments = new Comments(req.body);
    // 현재 사용자 ID 설정
    comments.user = req.user;
    // 수신데이터 저장
    comments.save(function(error){
        if (error) {
            return res.send(400, {
                message: error
            });
        }
        res.redirect('/comments');
    });
};

// 코멘트 인증 미들웨어
exports.hasAuthorization = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}; 