var express = require('express');
var router = express.Router();
// 패스워드 처리를 위한 passprot모듈
var passport = require('passport');
// 이메일에서 ravatar 아이콘 얻기
var gravatar = require('gravatar');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

router.get('/login', function(req, res, next)
{
  res.render('login', {title: 'Login Page', message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res)
{
  res.render('signup', {title: 'Signup Page', message:req.flash('signupMessage')});
});

// POST메서드용 로그인 처리
router.post('/login', passport.authenticate('local-login', {
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash: true
}));

// POST메서드용 가입처리
router.post('/signup', passport.authenticate('local-signup',{
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

//사용자 로그인여부 확인
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

// Get메서드용 로그아웃 페이지
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Get메서드용 프로필 페이지
router.get('/profile', isLoggedIn, function(req, res, next){
  res.render('profile', {title: 'Profile Page', user: req.user, avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d:'retro'}, true)});
})

module.exports = router;
