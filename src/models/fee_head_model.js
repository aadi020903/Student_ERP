const mongoose = require('mongoose');

const feeHeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const quarterSchema = new mongoose.Schema({
  quarterNumber: {
    type: Number,
    required: true,
  },
  feeHeads: [feeHeadSchema],
  status: {
    type: String,
    default: 'pending',
  },
});

const fee_head_schema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  quarters: [quarterSchema],
});

module.exports  = mongoose.model('feeStatus', fee_head_schema);