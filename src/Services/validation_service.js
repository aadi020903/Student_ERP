const dataModel = require("../models/student_model");
const studenAccModel = require("../models/studentaccountmodel");
const feeStatusModel = require("../models/fee_head_model");
const adminModel = require('../models/admin_model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.student_register = async (req, res) => {
  try {
    const token = req.cookies.token;

    let admin = await adminModel.findOne({ authKey: token });
    if (admin) {
      return {
        success: true,
        admin: admin,
        message: "Admin Found",
      };
    } else {
      return {
        success: false,
        admin: [],
        message: "Admin Not Found",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

// Registeration of student by admin
exports.student_registered = async (req, res) => {
  try {
    const count = await dataModel.countDocuments();
    const sidCounter = count + 1;

    const currentYear = new Date().getFullYear();
    let batch = `${currentYear}-${currentYear + 1}`;

    const sid = `${currentYear}100${sidCounter}`;
    const registerid = `${currentYear}${req.body.branch}100${sidCounter}`;

    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const phone = req.body.phone.trim();
    const sClass = req.body.class.trim();
    const branch = req.body.branch.trim();
    const gender = req.body.gender.trim();
    const DOB = req.body.DOB.trim();
    const address = req.body.address.trim();
    const fatherName = req.body.fatherName.trim();
    const motherName = req.body.motherName.trim();
    const state = req.body.state.trim();
    const city = req.body.city.trim();
    const pincode = req.body.pincode.trim();
    const totalAmount = req.body.totalAmount.trim();
    const paidAmount = req.body.paidAmount.trim();
    const dueAmount = (parseInt(totalAmount) - parseInt(paidAmount)).toString();

    let hashPassword = await bcrypt.hash("1234567", 10);
    const data = {
      name,
      email,
      phone,
      fatherName,
      motherName,
      state,
      city,
      pincode,
      sid,
      regNo: registerid,
      branch,
      batch,
      DOB,
      gender,
      totalAmount,
      paidAmount,
      dueAmount,
      address,
      class: sClass,
      password: hashPassword,
    };

    let checkStudent = await dataModel.findOne({
      name,
      email,
      fatherName,
      motherName,
    });

    if (checkStudent) {
      return {
        success: false,
        data: [],
        message: "Student already exists",
      };
    }

    const newdata = new dataModel(data);
    let datas = await newdata.save();

    let accModel = new studenAccModel({
      sid: sid,
      name: name,
      phone: phone,
      fathername: fatherName,
      totalAmount: totalAmount,
      paidAmount: paidAmount,
      dueAmount: dueAmount,
    });

    await accModel.save();

    let quarterFee = totalAmount / 4;

    let quarters = [];
    let tuitionFee = (quarterFee * 8) / 10;
    let conveyanceFee = quarterFee - tuitionFee;

    for (let i = 1; i <= 4; i++) {
      let status = 'pending';

      if (i == 1) {
        if (parseInt(paidAmount) >= quarterFee) {
          status = "paid";
        }
      } else if (i == 2) {
        if (parseInt(paidAmount) >= 2 * quarterFee) {
          status = "paid";
        }
      } else if (i == 3) {
        if (parseInt(paidAmount) >= 3 * quarterFee) {
          status = "paid";
        }
      } else if (i == 4) {
        if (parseInt(paidAmount) >= parseInt(totalAmount)) {
          status = "paid";
        }
      }

      quarters.push({
        status,
        quarterNumber: i,
        feeHeads: [
          {
            name: "Tuition Fee",
            amount: tuitionFee,
          },
          {
            name: "Conveyance Fee",
            amount: conveyanceFee,
          },
        ],
      });
    }

    let feeStatus = new feeStatusModel({
      sid,
      year: currentYear,
      quarters,
    });

    await feeStatus.save();

    if (datas) {
      return {
        success: true,
        data: datas,
        message: "Data saved successfully",
      };
    }

    if (!datas) {
      return {
        success: false,
        data: [],
        message: "Data not saved",
      };
    }
  } catch (error) {
    console.log("Error in register service", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

// Login of student
exports.loginservice = async (req) => {
  const password = req.body.password.trim();

  try {
    let foundUser = await dataModel.findOne(
      { email: req.body.email.trim() } || { phone: req.body.phone.trim() }
    );

    if (!foundUser) {
      return {
        success: false,
        data: [],
        message: "Student not found",
      };
    }

    let result = await bcrypt.compare(password, foundUser.password);
    if (result == true) {
      const token = await jwt.sign(
        {
          _id: result._id,
        },
        process.env.SECRET_KEY
      );

      let data_ = await dataModel.findByIdAndUpdate(
        foundUser._id,
        { auth: token },
        { new: true }
      );

      return {
        success: true,
        data: data_,
        message: "Login Successful",
      };
    }

    if (result == false) {
      return {
        success: false,
        data: [],
        message: "Invalid Credentials",
      };
    }
  } catch (error) {
    console.log("Error in login service", error);
  }
};

// Total student service
exports.totalentryservice = async (req, res) => {
  try {
    let totalentry = await dataModel.countDocuments();
    return {
      success: true,
      data: totalentry,
      message: "Total entries in database",
    };
  } catch (error) {
    console.log("Error in total student", error);
  }
};
