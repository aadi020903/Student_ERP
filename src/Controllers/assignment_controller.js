const {
  assignment_submit,
  assignment_submitted,
  assignment_view,
} = require("../Services/assignment_service.js");

exports.assignment_submit = async (req, res) => {
  try {
    let data = await assignment_submit(req, res);
    if (data.success) {
      res.json({
        success: true,
        teacher: data.teacher,
      });
    } else {
      res.status(401).json({
        success: false,
        message: data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.assignment_submitted = async (req, res) => {
  try {
    let data = await assignment_submitted(req, res);
    console.log(data);
    if (data.success) {
      res.status(200).json({
        success: true,
        message: data.message,
      });
    } else {
      res.status(401).json({
        success: false,
        message: data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.assignment_view = async (req, res) => {
  try {
    let data = await assignment_view(req, res);
    if (data.success) {
      res.status(200).json({
        success: true,
        assignments: data.assignments,
      });
    } else {
      res.status(401).json({
        success: false,
        message: data.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
