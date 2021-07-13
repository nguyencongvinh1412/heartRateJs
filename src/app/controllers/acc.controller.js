const db = require('../models/user');

// user/login  [get]
module.exports.getLogin = (req, res, next) => {
    res.render('acc/login');
}

// user/register [get]
module.exports.getRegister = (req, res, next) => {
    res.render('acc/register');
}

// user/login [post]
module.exports.postLogin = (req, res, next) => {
    const data = req.body;
    db.findOne({
       name: data.email,
       pass: data.password,
    })
    .then(user => {
        if(user != null) {

            res.cookie('userId', user._id, { 
                maxAge: 1000*60*60*12,
                signed: true,
            });

            if(user.level == 0){
                res.redirect('/admin/controller');
            }
            else {
                res.redirect('/user/controller');
            }
        }
        else {
            res.render('acc/login', {
                message: 'Tên đăng nhập hoặc mật khẩu chưa đúng',
            })
        }
        return;
    })
    .catch(err => next(err));
}

// user/register [post]
module.exports.postRegister =  async (req, res, next) => {

    let codeCreate;
    const email = req.body.name;
    var repeat;
    do{
        repeat = true;
        codeCreate = Math.floor(Math.random()*8999) + 1000; 
        const user = 
            await db.findOne({code: codeCreate, name: email})
                .then((user) => user);
        const userDeleted = 
            await db.findOneDeleted({code: codeCreate, name: email})
                .then((user) => user);
        
        if(!user && !userDeleted) {
            repeat = false;
        }
    }while(repeat);

    req.body.level = '1';
    req.body.code = codeCreate.toString();
    const data = req.body;
    const newUser = new db(data);
    newUser.save()
    .then((user) => {
        res.redirect('/acc/login');
    })
    .catch(err => next(err));
}

// acc/logout [get]
module.exports.logout = (req, res, next) => {
    res.clearCookie('userId');
    res.redirect('/');
}