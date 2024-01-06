const {
    student_notification,
    student_notification_post,
    student_notification_view,
  } = require("../Services/student_message_sender");
           
  exports.student_notification = async (req, res) => {
    let data = await student_notification(req);
    if (data.success) {
      res.render("student_message_sender",{Dataad:data.admin});
    }
    else{
      // res.status(404).json(data.data);
      console.log(data.message);
    }
  }

  exports.student_notification_post = async (req, res) => {
    let data = await student_notification_post(req, res);
    if (data.success) {
      res.redirect("student_notification");
      console.log(data.message);
    }
    if (!data.success) {
      console.log(data.message);
    }
  };

  exports.student_notification_view = async (req, res) => {
    let data = await student_notification_view(req, res);
    if (data.success) {
      res.status(200).send({
        message: data.message,
        everyone_data: data.everyone_data,
        student_data: data.sid_data,
        class_data: data.class_data,
      })
    }
    if (!data.success) {
      console.log(data.message);
    }
  };