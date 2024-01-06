const studentModel = require("../models/student_model");
const feeModel = require("../models/fee_head_model");
const accountModel = require('../models/studentaccountmodel')
exports.getStudentFeeDetails = async (req, res) => {
  const token = req.headers.token;
  try {
    let student = await studentModel.findOne({ auth: token });
    let feeDetails = await feeModel.findOne({ sid: student.sid });
    let accDetails = await accountModel.findOne({ sid : student.sid });
    
    feeDetails = {
      sid: feeDetails.sid,
      quarters: feeDetails.quarters,
      year: feeDetails.year,
      totalAmount: accDetails.totalAmount,
      dueAmount: accDetails.dueAmount,
      paidAmount: accDetails.paidAmount
    }
    if (!student) {
      return {
        success: false,
        feeDetails: [],
        message: "No student found!",
      };
    }
    if (feeDetails) {
      return {
        success: true,
        feeDetails: feeDetails,
        message: "Fee Details found!",
      };
    } else {
      return {
        success: false,
        data: [],
        message: "No fee details found!",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getStudentDueFeeDetails = async (req, res) => {
  const token = req.headers.token;
  try {
    let student = await studentModel.findOne({ auth: token });
    let feeDetails = await feeModel.findOne({ sid: student.sid });
    if (!student) {
        return {
            success: false,
            feeDetails: [],
            message: "No student found",
        };
    }
      let dueFee = [] 
      feeDetails.quarters.forEach((quarter) => {
        if (quarter.status === 'pending') {
          dueFee.push(quarter); 
        }
      });
    if (dueFee) {
        return {
            success: true,
            dueFee: dueFee,
            message: "success",
          }
    } else {
        return {
            success: false,
            dueFee: [],
            message: "failure",
          }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getStudentPayFeeDetails = async (req, res) => {
  const token = req.headers.token;
  try {
    let student = await studentModel.findOne({ auth: token });
    let feeDetails = await feeModel.findOne({ sid: student.sid  });

    if (!student) {
        return {
            success: false,
            feeDetails: [],
            message: "No student found",
        };
    }
      let payFee = [] 
      feeDetails.quarters.forEach((quarter) => {
        if (quarter.status === 'paid') {
          payFee.push(quarter); 
        }
      });
    if (payFee) {
        return {
            success: true,
            payFee: payFee,
            message: "success",
          }
    } else {
        return {
            success: false,
            payFee: [],
            message: "failure",
          }
    }
  } catch (error) {
    console.log(error);
  }
};
