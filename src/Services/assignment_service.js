const assignmentModel = require("../models/assignment_model");
const studentModel = require("../models/student_model");
const teacherModel = require("../models/Teacher_Model");

exports.assignment_submit = async (req, res) => {
const token = req.headers.token;
  try {
    let teacher = await teacherModel.findOne({ auth_key: token });

    if (!teacher) {
      return {
        success: false,
        teacher: [],
        message: "Teacher Not Found",
      };
    } else {
      return {
        success: true,
        teacher,
        message: "Teacher Found",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.assignment_submitted = async (req, res) => {
  const token = req.headers.token;

  let assignment_name = req.body.assignment_name;
  let description = req.body.description;
  let subject = req.body.subject;
  let dueDate = req.body.dueDate;
  let studentClass = req.body.class;
  let branch = req.body.branch;
  let assignment_file = req.file;

  try {

    let teacher = await teacherModel.findOne({ auth_key: token });

    let assignmentData = {
      assignment_name,
      assignment_file:assignment_file.filename,
      description,
      dueDate,
      subject,
      class:studentClass,
      branch,
      teacher:teacher.teacher_name,
    };
    const existingAssignment = await assignmentModel.findOne({ assignment_name, subject });

    if (existingAssignment) {
      return {
        success: false,
        data: [],
        message: 'Assignment with the same name already exists',
      };
    }

    let addAssignment = await assignmentModel.create(assignmentData);

    if (addAssignment) {
      return {
        success: true,
        data: assignmentData,
        message: "Assignment Added",
      };
    } else {
      return {
        success: true,
        data: assignmentData,
        message: "Assignment Added",
      };
    }
  } catch (error) {
    console.log(error);
  }
};
exports.assignment_view = async (req, res) => {
  const token = req.headers.token;
  try {
    let student = await studentModel.findOne({ auth: token });
    let studentClass = student.class;
    let branch = student.branch;
    let assignments = await assignmentModel.find({ class: studentClass , branch});
    if (assignments) {
      return {
        success: true,
        assignments,
        message: "Assignments Fetched Successfully",
      };
    } else {
      return {
        success: false,
        assignments: [],
        message: "Assignments Not Fetched",
      };
      
    }
  } catch (error) {
    console.log(error);
  }
};
