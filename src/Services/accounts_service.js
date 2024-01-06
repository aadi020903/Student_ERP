const { request } = require("express");
const regmodel = require("../models/student_model");
const accmodel = require("../models/studentaccountmodel");
const adminModel = require('../models/admin_model')

exports.accservice = async (req, res) => {
  
  // const sid = req.body.sid;
  try {
    let student = await regmodel.findOne({ sid: sid });
    if (!student) {
      return {
        success: false,
        data: [],
        message: "Student not found",
      };
    }




    const data = {
      sid: req.body.sid,
      name: student.name,
      phone: student.phone,
      fathername: student.fatherName,
      totalAmount: student.totalAmount,
      paidAmount: student.paidAmount,
      dueAmount: student.dueAmount,
    };
    const newdata = new accmodel(data);
    await newdata.save();

    return {
      success: true,
      data: newdata,
      message: "Data saved successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

exports.payservice = async (req, res) => {
  const amount = req.body.amount;
  
  try {
    let foundUser = await regmodel.findOne({ sid: req.body.sid });
    if (!foundUser) {
      return {
        success: false,
        data: [],
        message: "Student not found",
      };
    }
    let dueAmount = foundUser.dueAmount - amount;
    let paidAmount = foundUser.paidAmount + amount;

    let update_amount = await regmodel.findByIdAndUpdate(
      foundUser._id,
      { dueAmount: dueAmount, paidAmount: paidAmount },
      { new: true }
    );

    return {
      success: true,
      data: update_amount,
      message: "Payment done successfully",
    };
  } catch (error) {
    console.log("here brother in payservice ", error);
  }
};

exports.acc_details_service = async (req, res) => {
  // let sid = req.body.sid;
  // console.log(sid);
  try {
    // let foundUser = await accmodel.findOne({ sid: sid });
    // console.log(foundUser);
    let details = await accmodel.find();
    // console.log(details);
    // let token = req.cookies.jwt;
    // console.log(token);

    const token = req.cookies.token;

    let admin = await adminModel.findOne({ authKey: token });

  
    if (!details) {
      return {
        success: false,
        data: [],
        message: "Details not found",
      };
    } else {
      return {
        success: true,
        data: details,
        admin,
        message: "Data fetched successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};
