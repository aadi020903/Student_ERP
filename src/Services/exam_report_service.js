const examReportModel = require("../models/exam_report_model");
const studentModel = require("../models/student_model");
const adminModel = require("../models/admin_model");

exports.exam_report_submit = async (req, res) => {
  try {
    const token = req.cookies.token;
    let admin = await adminModel.findOne({ authKey: token });
    // console.log(admin);
    if (admin) {
      return {
        success: true,
        admin,
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

exports.exam_report_submitted = async (req, res) => {
  let sid = req.body.sid;
  let report_name = req.body.report_name;
  let report_file = req.file;
  let status = req.body.status;
  console.log(report_file);
  try {
    let reports = [
      {
        report_name,
        report_file: report_file.filename,
        status,
      },
    ];

    let studentReport = {
      sid,
      reports,
    };
    let reportData;
    let existingReport = await examReportModel.findOne({ sid });
    if (existingReport) {
      reportData = await examReportModel.updateOne(
        { sid },
        { $push: { reports: studentReport.reports[0] } }
      );
    } else {
      reportData = await examReportModel.create(studentReport);
    }
    if (reportData) {
      return {
        success: true,
        studentReport,
        message: "Report Added Successfully",
      };
    } else {
      return {
        success: false,
        studentReport: [],
        message: "Report Not Added",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.exam_report_view = async (req, res) => {
  const token = req.headers.token;
  console.log(token);
  try {
    let student = await studentModel.findOne({ auth: token });
    console.log(student);
    let sid = student.sid;
    let reportData = await examReportModel.findOne({ sid });
    console.log("Report Data : ", reportData);
    if (reportData) {
      return {
        success: true,
        reportData,
        message: "Report Fetched Successfully",
      };
    } else {
      return {
        success: false,
        reportData: [],
        message: "Report Not Fetched",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
