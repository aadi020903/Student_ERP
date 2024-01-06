const {
    view_student_attendance_service,
  } = require("../Services/view_student_attendance_service");
  exports.view_student_attendance = async (req, res) => {
    let data = await view_student_attendance_service(req, res);

  
    if (data.success) {
      console.log("datadsdsds", data.data);
      res.status(200).send({
        message: "student attendance",
        data:data.data,
      })
  
    } else {
      res.send("Error Happened");
    }
  };
  