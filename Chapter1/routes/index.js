var express = require('express');
var router = express.Router();

var passport = require('passport');
var gravatar = require('gravatar');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get메서드용 로그인 페이지
router.get('login', function(req, res, next){
  res.render('login', {title:'Login Page', message: req.flash('loginMessage')});
})

// 포스트 메서드용 로그인 처리
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

// Get 메서드용 가입 페이지
router.get('signup', function(req, res){
  res.render('signup', {title:'Signup Page', message: req.flash('signupMessage')});
});

//포스트 메서드용 가입 처리
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect:'/profile',
  failureRedirect:'/signup',
  failureFlash:true
}));

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Get메서드용 로그아웃 페이지
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

module.exports = router;
