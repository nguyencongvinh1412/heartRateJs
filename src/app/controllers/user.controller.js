const db = require('../models/user');
const userrecord = require('../models/userRecord');
const recommend = require('../models/recommend');
const fillterUserRecord = require('../../resources/middlewares/fillterValueUserRecord');

// user/controller [get]
module.exports.controller = (req, res, next) => {
    res.render('user/controller', {
        layout: 'user',
    })
}

// user/detail [get]
module.exports.detail = (req, res, next) => {
    const id = req.signedCookies.userId;
    db.findOne({_id: id})
    .then(user => {
        user = user.toObject();
        res.render('user/detail', {
            user,
            layout: 'user',
        })
    })
    .catch(err => next(err))
}

// user/repairUser [get]
module.exports.repairUser = (req, res, next) => {
    const id = req.signedCookies.userId;
    const data = req.body;
    db.findOneAndUpdate({_id: id}, data)
    .then(user => {
        res.redirect('/user/detail')
    })
    .catch(err => next(err));
}

// user/measureHistory [get]
module.exports.measureHistory = (req, res, next) => {
    const id = req.signedCookies.userId;
    userrecord.find({idAcc: id})
    .populate('idRecommend', 'Recommend')
    .then(userrecords => {
        userrecords = userrecords.map(user => user.toObject());
        const filterValue = fillterUserRecord.filterValue(userrecords);
        
        res.render('user/measureHistory', {
            time: filterValue.time,
            heart: filterValue.heart,
            oxi: filterValue.oxi,
            pre: filterValue.pre,
            users: userrecords,
            layout: 'user',
        })
    })
    .catch(err => next(err));
}