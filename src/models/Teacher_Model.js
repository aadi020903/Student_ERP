const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answer = new Schema(
  { 

    teacher_name: {
        type: String,
        default: "",
    },

    email: {
        type: String,
        default: "",
    },

    password: {
        type: String,
        default: null,
    },

    mobile: {
        type: Number,
        default: null,
    },

    auth_key: {
        type: String,
        default: null,
    },

    status: {
        type: String,
        default: "Active",
    },

    joining_date: {
        type: Date,
        default: null,
    },

    dob: {
        type: Date,
        default: null,
    },

    address: {
        type: String,
        default: "",
    },

    gender: {
        type: String,
        default: "",
    },

    nationality: {
        type: String,
        default: "",
    },

    assigned_class: {
        type: String,
        default: null,
    },
    image:{
      type: String,
      default: null,
    }

    // current_status: {
    //   type: String,
    //   default: "Clocked_Out",
    // }

  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("teacher", answer);