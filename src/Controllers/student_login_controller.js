
const { reset } = require("nodemon");
const {
  student_login_save,
  
} = require("../Services/student_login_service");

exports.student_login_save = async (req, res) => {
    let data = await student_login_save(req, res);
    if (data.success) {
      console.log(data.token);
      res.status(200).send({
        message: "Successfully Logined",
        token:data.token,
      })
    } else {
      res.status(401).send({
        message: "Wrong Crediantials",
      })
    }
  };