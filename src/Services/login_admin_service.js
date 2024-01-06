const admin_model = require("../models/admin_model.js");
const studentModel = require("../models/student_model");
const teacherModel = require("../models/Teacher_Model.js");
const attendanceModel = require("../models/AttendanceModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

exports.login_admin_service = async (req, res) => {
  const trypassword = req.body.password;

  const tryemail = req.body.email;
  // console.log(trypassword);
  // console.log(tryemail);
  try {
    const admin = await admin_model.findOne({ email: tryemail });
    // console.log(admin);
    if (!admin) {
      return {
        success: false,
        message: "Invalid email or password",
        data: null,
      };
    }
    const isMatch = await bcrypt.compare(trypassword, admin.password);
    console.log(isMatch);
    if (!isMatch) {
      return {
        success: false,
        message: "Invalid email or password",
        data: null,
      };
    }
    // Create a token
    // const token = jwt.sign(admin.id, process.env.JWT_SECRET);
    // console.log(token);

    // Set the token as a cookie
    const token = await jwt.sign(
      {
        _id: admin._id,
      },
      process.env.SECRET_KEY,
      // {
      //   expiresIn:"90s"
      // }
    );
    res.cookie("token", token, { httpOnly: true });

    // Update the admin's authkey in the database
    const login_admin = await admin_model.findOneAndUpdate(
      { email: tryemail },
      { authKey: token },
      { new: true }
    );

    let studentCount = await studentModel.countDocuments({});
    let teacherCount = await teacherModel.countDocuments({});
    let attendanceCount = await attendanceModel.countDocuments({});
    // console.log(studentCount,teacherCount,attendanceCount);
    if (!login_admin) {
      return {
        success: false,
        message: "Invalid email or password",
        data: [],
        admin: [],
      };
    }
    if (login_admin) {
      return {
        success: true,
        message: "Admin logged in successfully",
        admin: login_admin,
        data: {
          studentCount,
          teacherCount,
          attendanceCount,
        },
      };
    }
  } catch (error) {
    console.log(`${error} hey `);
  }
};
