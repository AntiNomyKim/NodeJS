var models = require('../models/index');
var User = require('../models/user');

exports.create = function(req, res){
    // requrest body를 가진 user모델
    models.User.create({
        name: req.body.name,
        email: req.body.email
    }).then(function(users){
        res.json(users);
    });
};

exports.list = function(req, res){
    // 전체 User목록
    models.User.findAll({}).then(function(users){
        res.json(users);
    });
};