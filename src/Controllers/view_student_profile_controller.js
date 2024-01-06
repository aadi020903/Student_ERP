const {
    student_profile,
  } = require("../Services/view_student_profile_service");

exports.student_profile = async (req, res) => {
    let data = await student_profile(req, res);

    if (data.success) {
      console.log(data);
      console.log(data.message);

      res.status(200).send({
        message: "student Profile",
        data : data.data,
      })
    } else {
      res.status(401).send({
        message: "Something Went Wrong",
      })
    }
  };