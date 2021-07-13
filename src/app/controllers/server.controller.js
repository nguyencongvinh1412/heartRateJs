const users = require('../models/user');
const userrecord = require('../models/userRecord');
const recommend = require('../models/recommend');
const framingham = require('../models/framingham');


const prediction = require('../../resources/middlewares/prediction');

const fs = require('fs');
const path = require('path');
const { db } = require('../models/user');

// server/checkpass?pass=... [get]
module.exports.checkpass = (req, res, next) => {
    const code = req.query.pass;
    users.findOne({code: code})
    .then(user=> {
        if(user != null || user != undefined) {
            user = user.toObject();
            fs.writeFile(path.join(__dirname, '../../', 'public/tests/dataUser.txt'), user._id, (err) => {
                res.send('error: ' + err);
            });
        }
        else {
            fs.writeFile(path.join(__dirname, '../../', 'public/tests/dataUser.txt'), '', (err) => {
                res.send('error: ' + err);
            });
        }
    })
    .catch(err => next(err));
}

// server/training?heart=...&oxi=... [get]
module.exports.training = (req, res, next) => {
    const heart = req.query.heart;
    const oximeter = req.query.oximeter;
    let pre;
    fs.readFile(path.join(__dirname, '../../', 'public/tests/dataUser.txt'), {encoding: 'utf8'}, async (err, idAcc) => {
        if(!err) {
            // lấy được user tương ứng với idAcc
            let user = await users.findOne({_id: idAcc});
            user = user.toObject();

            // training theo thuật toán  => sick = 0|1
                // các trường train => sex, age, currentSmoker, BPMeds, prevalentStroke, prevalentHyp
                // diabetes, bmi, heart, sick (matrix Y)
            await framingham.findWithDeleted({})
            .then(frams => {
                frams = frams.map(fram => fram.toObject());
                pre = prediction.prediction(frams, user, heart);
            })
            .catch(err => next(err));
            res.send('result:' + pre);

            // chuyển các giá trị các trường trong user thành các mức tương ứng trong recommend
                // heart, smoker, bmi, sick
            
            // lấy được recommend tuơng ứng với các giá trị cần so sánh 
                // heart, smoker, sick, bmi 

            // lưu gía trị trong trường recommendLCD vào file dataRecommend.txt

            // ghép các giá trị cần thiết vào 1 object, lưu object đó vào userrecord
                // idAcc, sex, age, currentSmoker, cigsPerDay, BPMeds, prevalentStroke
                // prevalentHyp, diabetes, BMI, heartRate, oximeter, prediction, idRecommend
            
        }
    })
}
