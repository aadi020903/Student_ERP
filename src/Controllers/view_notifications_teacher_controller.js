const {
    teacher_notification_view,
    teacher_notification_forward,
  } = require("../Services/view_notifications_teacher_service");

  exports.teacher_notification_view = async (req, res) => {
    let data = await teacher_notification_view(req, res);
    if (data.success) {
      res.status(200).send({
        message: data.message,
        allTeacherData: data.allTeacherData,
        one_teacher: data.one_teacher,
      })
    }
    if (!data.success) {
      console.log(data.message);
    }
  };

  exports.teacher_notification_forward = async (req, res) => {
    let data = await teacher_notification_forward(req, res);
    if (data.success) {
      res.status(200).send({
        message: data.message,
      })
    }
    if (!data.success) {
      console.log(data.message);
    }
  };