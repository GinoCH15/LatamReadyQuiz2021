const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  user:String,
  item: String,
  price:Number,
  quantity: Number
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;