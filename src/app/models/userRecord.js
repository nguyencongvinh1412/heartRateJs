const suc_khoe = require('./recommend');
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const UserRecord = new Schema({
    idAcc: String,
    sex: String,
    age: String,
    currentSmoker: String,
    cigsPerDay: String,
    BPMeds: String,
    prevanlentStroke: String,
    prevalentHyp: String,
    diabetes: String,
    BMI: String,
    heartRate: String,
    oximeter: String,
    prediction: String,
    idRecommend: {type: mongoose.Types.ObjectId, ref: 'suc_khoe'},
  },
  {
    timestamps: true,
  }
  );

  UserRecord.plugin(mongoose_delete, { overrideMethods: 'all' });

  module.exports = mongoose.model('userRecord', UserRecord);