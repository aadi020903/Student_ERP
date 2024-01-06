const mongoose = require("mongoose");
const dbcollection = process.env.DB_COLLECTION;


const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    format: "dd/mm/yyyy",
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
  },
  sid: {
    type: String,
    required: true,
    unique: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  batch: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
  },
  dueAmount: {
    type: Number,
  },
  auth:{
    type :String,
    default :""
  },
  password: { 
    type: String, 
    default: null 
  },
});

module.exports = mongoose.model(dbcollection, studentSchema);
