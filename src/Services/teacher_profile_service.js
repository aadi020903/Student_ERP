const teacherModel = require("../models/Teacher_Model");

exports.teacher_profile = async (req, res) => {
  let token = req.headers.token;
  try {
    let teacher = await teacherModel.findOne({ auth_key: token });
    const { password, auth_key, ...safeTeacherData } = teacher._doc;
    if (teacher) {
      // res.cookie('test', 'yourTokenValue', { httpOnly: true });
      return {
        teacher:safeTeacherData,
        success: true,
        message: "Teacher Found!",
      };
    } else {
      return {
        success: false,
        teacher: [],
        message: "Teacher Not Found!",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------------Update Teacher Profile-------------------------------
exports.teacher_profile_update = async (req, res) => {
  let token = req.headers.token;
  try {
    let teacher = await teacherModel.findOne({ auth_key: token });
    const { password, auth_key, ...safeTeacherData } = teacher._doc;
    if (teacher) {
      return {
        teacher:safeTeacherData,
        success: true,
        message: "Teacher Found!",
      };
    } else {
      return {
        success: false,
        teacher: [],
        message: "Teacher Not Found!",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.teacher_profile_updated = async (req, res) => {
  let token = req.headers.token;
  let body = req.body;
  let image = req.file;

  try {
    let teacher = await teacherModel.findOne({ auth_key: token });

    if (teacher) {
      let updatedTeacher = await teacherModel.findOneAndUpdate(
        { auth_key: token },
        { $set: { ...body, image: image.filename } },
        { new: true }
      );

      const { password, auth_key, ...safeTeacherData } = updatedTeacher._doc;

      if (updatedTeacher) {
        return {
          success: true,
          teacher: safeTeacherData,
          message: "Teacher updated successfully!",
        };
      } else {
        return {
          success: false,
          teacher: null,
          message: "Failed to update teacher.",
        };
      }
    } else {
      return {
        success: false,
        teacher: null,
        message: "Teacher not found!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      teacher: null,
      message: "An error occurred while updating teacher profile.",
    };
  }
};
