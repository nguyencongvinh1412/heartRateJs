const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const User = new Schema({
    level: String,
    name: String,
    pass: String,
    sex: String,
    age: String,
    weight: String,
    height: String,
    currentSmoker: String,
    cigsPerDay: String,
    BPMeds: String,
    prevalentStroke: String,
    prevalentHyp: String,
    diabetes: String,
    code: String,
  },
  {
    timestamps: true,
  }
  );

  User.plugin(mongoose_delete, { overrideMethods: 'all' });

  module.exports = mongoose.model('users', User);
  // const conn = mongoose.createConnection('mongodb+srv://congvinh:Congvinh@cv9firstblogproject.4ooie.mongodb.net/heartrate?retryWrites=true&w=majority');
  // const user = conn.model('users', User);
  // if(user) {
  //   console.log('connect successfully');
  //   console.log(user);
  // }
  // else {
  //   console.log('connect failed')
  // }
  // module.exports = user;