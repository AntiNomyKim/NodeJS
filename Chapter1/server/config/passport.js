//패스포트 모듈 로드
var LocalStrategy = require('passport-local').Strategy;
//User모델 가져오기
var User = require('../models/user');

module.exports = function(passport){
    //패스포트 초기화 설정
    //세션을 위해 user직렬화
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    //user 역직렬화
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    });

    //local strategy 사용
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        if(email)
        {
            //소문자변환
            email = email.toLowerCase();
        }
        //비동기 처리
        process.nextTick(function(){
            User.findOne({'local.email' : email }, function(err, user){
                if(err)
                {
                    return done(err);
                }

                if(!user)
                {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if(!user.validPassword(password))
                {
                    return done(null, false, req.flash('loginMessage', 'Wrong Password.'));
                }
                else
                {
                    return done(null, user);
                }
            });
        });
    }));

    //local strategy 등록
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, email, password, done)
    {
        if(email)
        {
            email = email.toLowerCase();
        }

        process.nextTick(function()
        {
            if(!req.user)
            {
                User.findOne({ 'local.email': email }, function(err, user)
                {
                    if(err)
                    {
                        return done(err);
                    }

                    if(user)
                    {
                        return done(null, false, req.flash('signupMessage', 'The Email is already taken.'));
                    }
                    else
                    {
                        //user 생성
                        var newUser = new User();
                        //req.body로 부터 사용자 명 가져오기
                        newUser.local.name = req.body.name;
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        //save
                        newUser.save(function(err){
                            if(err){
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            }
            else
            {
                return done(null, req.user);
            }
        });
    }));
};