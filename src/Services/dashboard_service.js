const studentModel = require("../models/student_model");
const teacherModel = require("../models/Teacher_Model");
const attendanceModel = require("../models/AttendanceModel");
const adminModel = require('../models/admin_model')

exports.dashboard_service = async (req, res) => {
  let studentCount = await studentModel.countDocuments({});
  let teacherCount = await teacherModel.countDocuments({});
  let attendanceCount = await attendanceModel.countDocuments({});

  const token = req.cookies.token;

  let admin = await adminModel.findOne({ authKey: token });

  return{
    success:true,
    data:{
      studentCount,
      teacherCount,
      attendanceCount,
    },
    admin,
    message:"success"
  }
};
