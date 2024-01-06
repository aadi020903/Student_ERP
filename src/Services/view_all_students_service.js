const teacher_model = require('../models/Teacher_Model');
const student_model = require('../models/student_model');

exports.view_all_students_service = async (req, res) => {
  try {
    const token = req.headers.token;

    // Find the teacher
    const teacher = await teacher_model.findOne({ auth_key: token });

    if (!teacher) {
      return {
        success: false,
        message: "Teacher not found",
      };
    }

    const assignedClass = teacher.assigned_class;

    // Find students in the assigned class
    const students = await student_model.find({ class: assignedClass });

    if (students.length > 0) {
      // Process each student and extract relevant information
      const studentsData = students.map(student => {
        return {
          name: student.name,
          class: student.class,
          sid: student.sid,
        };
      });

      return {
        success: true,
        students: studentsData,
        message: "Students Found",
      };
    } else {
      return {
        success: false,
        message: "No students found",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while processing the request",
    };
  }
};
