const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Framingham = new Schema({
    male: String,
    age: String,
    currentSmoker: String,
    cigsPerDay: String,
    BPMeds: String,
    prevalentStroke: String,
    prevalentHyp: String, 
    diabetes: String,
    BMI: String,
    heartRate: String, 
    TenYearCHD: String,
  },
  {
    timestamps: true,
  }
  );

  Framingham.plugin(mongoose_delete, { overrideMethods: 'all' });

  module.exports = mongoose.model('framingham', Framingham);