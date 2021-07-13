const userRecord = require('../models/userRecord');
const db = require('../models/user');
const recommend = require('../models/recommend');

const fillterUserRecord = require('../../resources/middlewares/fillterValueUserRecord');

// admin/controller [get]
module.exports.controller = (req, res, next) => {
    res.render('admin/controller');
}

// admin/list_user [get]
module.exports.listUser = (req, res, next) => {

    db.find({})
        .then(users => {
            users = users.map(user => user.toObject());
            res.render('admin/mnListAcc',
                {
                    users,
                    layout: 'admin',
                })
        })
        .catch(err => { next(err); })
}

// admin/detail/id  [get]
module.exports.detailUser = (req, res, next) => {
    const id = req.params.id;
    db.findOne({ _id: id })
        .then(user => {
            user = user.toObject()
            res.render('admin/detail', {
                user,
                layout: 'admin'
            })
        })
        .catch(err => { next(err) });
}

// admin/deleteUser/:id [post]
module.exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    db.delete({ _id: id })
        .then(() => {
            res.redirect('/admin/list_user');
        })
        .catch(err => { next(err) })
}

// admin/repairUser/:id [post]
module.exports.repairUser = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    db.findByIdAndUpdate({ _id: id }, data)
        .then(user => {
            const link = '/admin/detail/' + id;
            res.redirect(link);
        })
        .catch(err => { next(err) })
}

// admin/addUser [get]
module.exports.getAddUser = (req, res, next) => {
    res.render('admin/addUser', {
        layout: 'admin',
    })
}

// admin/addUser [post]
module.exports.postAddUser = async (req, res, next) => {
    let codeCreate;
    const email = req.body.name;
    var repeat;
    do {
        repeat = true;
        codeCreate = Math.floor(Math.random() * 8999) + 1000;
        const user =
            await db.findOne({ code: codeCreate, name: email })
                .then((user) => user);
        const userDeleted =
            await db.findOneDeleted({ code: codeCreate, name: email })
                .then((user) => user);

        if (!user && !userDeleted) {
            repeat = false;
        }
    } while (repeat);

    req.body.level = '1';
    req.body.code = codeCreate.toString();
    const data = req.body;
    const newUser = new db(data);
    newUser.save()
        .then((user) => {
            res.redirect('/admin/list_user');
        })
        .catch(err => next(err));
}

// admin/measureHistoryList [get]
module.exports.measureHistoryList = (req, res, next) => {
    db.find({})
        .then(users => {
            users = users.map(user => user.toObject());
            res.render('admin/measureHistoryList', {
                users,
                layout: 'admin',
            })
        })
        .catch(err => next(err));
}

// admin/measureHistory/:id [get]
module.exports.measureHistory = (req, res, next) => {
    const id = req.params.id.toString();
    let filterValue;
    userRecord.find({idAcc: id})
        .populate('idRecommend', 'Recommend')
        .then(userrecords => {
            userrecords = userrecords.map(user => user.toObject());
            filterValue = fillterUserRecord.filterValue(userrecords);

            res.render('admin/measureHistory', {
                time: filterValue.time,
                heart: filterValue.heart,
                oxi: filterValue.oxi,
                pre: filterValue.pre,
                users: userrecords,
                layout: 'admin',
            })
        })
        .catch(err => next(err));
        
}

// admin/add [get] 
// add 1 userrecords 
module.exports.add = (req, res, next) => {
    recommend.findOne({_id: "60e726ac2c304f731a241617"})
    .then(rec => {
        const user = {
            idAcc: "60df4b112c304f731a2e285d",
            sex: "1",
            age: "25",
            currentSmoker: "0",
            cigsPerDay: "0",
            BPMeds: "0",
            prevalentStroke: "0",
            prevalentHyp: "0",
            diabetes: "0",
            BMI: "23.39",
            heartRate: "88",
            oximeter: "90",
            prediction: "0",
            idRecommend: rec._id
        }

        usernew = new userRecord(user);
        usernew.save()
        .then(d => {
            res.json(d);
        })
    })
    .catch(err => next(err));
}