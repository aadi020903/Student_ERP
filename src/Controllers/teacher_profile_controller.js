const {
  teacher_profile,
  teacher_profile_update,
  teacher_profile_updated,
} = require("../Services/teacher_profile_service");

exports.teacher_profile = async (req, res) => {
  let data = await teacher_profile(req, res);
  if (data.success) {
    res.status(200).json({
      message: data.message,
      teacher: data.teacher,
    });
  } else {
    res.status(404).json({
      message: data.message,
      teacher: data.teacher,
    });
  }
};

exports.teacher_profile_update = async (req, res) => {
  let data = await teacher_profile_update(req, res);
  if (data.success) {
    res.status(200).json({
      message: data.message,
      teacher: data.teacher,
    });
  } else {
    res.status(404).json({
      message: data.message,
      teacher: data.teacher,
    });
  }
};
exports.teacher_profile_updated = async (req, res) => {
  let data = await teacher_profile_updated(req, res);
  if (data.success) {
    res.status(200).json({
      message: data.message,
      teacher: data.teacher,
    });
  } else {
    res.status(404).json({
      message: data.message,
      teacher: data.teacher,
    });
  }
};
