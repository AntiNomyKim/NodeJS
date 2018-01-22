var models = require('../models/index');
var Band = require('../models/band');

// 밴드 생성
exports.create = function(req, res){
    // requrest body를 가진 밴드 모델 생성
    models.Band.create(req.body).then(function(band){
        res.redirect('/bands')
    })
}

// Band목록
exports.list = function(req, res){
    // band목록을 날짜별로 정렬하기
    models.Band.findAll({
        order:'createdAt DESC'
    }).then(function(bands){
        // 결과 렌더링
        res.render('band-list', {
            title: 'List bands',
            bands: bands
        })
    })
}

// Band id로 열기
exports.byId = function(res, req){
    models.Band.find({
        where: {
            id: req.params.id
        }
    }).then(function(band){
        res.json(band)
    })
}

// ID로 업데이트
exports.update = function(req, res){
    models.Band.update({
        where: {
            id: req.params.id
        }
    }).then(function(band){
        if (band) {
            band.updateAttributes({
                name       : req.body.name,
                description: req.body.description,
                album      : req.body.album,
                year       : req.body.year,
                UserId     : req.body.user_id
            }).then(function(band){
                res.send(band)
            })
        }
    })
}
// ID로 삭제하기
exports.delete = function(req, res){
    models.Band.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(band){
        res.json(band);
    })
}