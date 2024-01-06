const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let mongoose = require("mongoose");

let teacherModel = require('../models/Teacher_Model');

exports.teacher_register_save = async (req) => {
  try {

    let email = req.body.email;

      let teacher = await teacherModel.findOne({email:email});

      if(teacher) {
          console.log("Teacher Already Exist");
          return {
              message: "Teacher Already Found",
              success: false,
            };
      } else {

    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);
    let teacher_name = req.body.teacher_name;
    let pass = req.body.pass;
    let mobile = req.body.mobile;
    let joining_date = req.body.joining_date;
    let address = req.body.address;
    let assigned_class = req.body.assigned_class;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let nationality = req.body.nationality;

    let savedata = new teacherModel({
      teacher_name: teacher_name,
      email: email,
      password: pass,
      mobile: mobile,
      joining_date: joining_date,
      address: address,
      assigned_class:assigned_class,
      gender: gender,
      dob: dob,
      nationality: nationality,
    });
    let saved_data = await savedata.save();
    if (saved_data)
      return {
        message: "Teacher Added Successfully",
        data: saved_data,
        success: true,
      };
    else {
      return {
        message: "Something Went Wrong",
        data: [],
        success: false,
      };
    }
  }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};