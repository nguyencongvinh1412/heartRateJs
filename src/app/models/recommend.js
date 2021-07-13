const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Suc_Khoe = new Schema({
    Heart_rate: String,
    Smoker: String,
    BMI: String,
    Sick: String,
    Recommend: String,
    RecommendLCD: String,
  },
  {
    timestamps: true,
  }
  );

  Suc_Khoe.plugin(mongoose_delete, { overrideMethods: 'all' });

  module.exports = mongoose.model('suc_khoe', Suc_Khoe);