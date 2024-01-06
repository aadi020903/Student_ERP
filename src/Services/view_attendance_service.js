const AttendanceModel = require('../models/AttendanceModel');
const Student_model = require('../models/student_model');
const admin_model = require('../models/admin_model');
const jwt = require('jsonwebtoken');

exports.view_attendance_service = async (req, res) => {
  try {
    let teacher;

    // Extract filter parameters from the query string
    const filtername = req.query.filtername ? req.query.filtername.trim() : null;
    const filtersid = req.query.filtersid ? req.query.filtersid.trim() : null;
    const filtercurrentClass = req.query.filterclass ? req.query.filterclass.trim() : null;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (filtername) {
      filter['entries.students.name'] = { $regex: new RegExp(filtername, 'i') };
    }
    if (filtersid) {
      filter['entries.students.sid'] = { $regex: new RegExp(filtersid, 'i') };
    }
    if (filtercurrentClass) {
      filter['currentClass'] = { $regex: new RegExp(filtercurrentClass, 'i') };
    }

    // Apply the filter to the userModel.find() query
    let data = [];
    if (Object.keys(filter).length > 0) {
      data = await AttendanceModel.find(filter);
    } else {
      data = await AttendanceModel.find();
    }

    let s_data = [];
    let user_cart = data.find((user_cartt) => {
      user_cartt.entries.find((user_carttt) => {
        user_carttt.students.find((studentss) => {
          s_data.push({
            currentClass: user_cartt.currentClass,
            currentClassTeacher: user_carttt.currentClassTeacher,
            date: user_carttt.date,
            sid: studentss.sid,
            status: studentss.status
          });
        });
      });
    });

    if (data) {
      return {
        message: "user is logged in",
        success: true,
        data: s_data,
        status: 200,
      };
    } else {
      return {
        message: "invalid credentials",
        success: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log("error", error);
    // Handle errors more gracefully, send an appropriate response to the client
    return {
      message: "An error occurred",
      success: false,
      status: 500,
    };
  }
};
