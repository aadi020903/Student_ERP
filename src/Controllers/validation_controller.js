const {
  student_register,
  student_registered,
  loginservice,
  totalentryservice,
} = require("../Services/validation_service");
         
exports.student_register = async (req, res) => {
  let data = await student_register(req);
  if (data.success) {
    res.render("student_register",{Dataad:data.admin});
  }
  else{
    // res.status(404).json(data.data);
    console.log(data.message);
  }
}
exports.student_registered = async (req, res) => {
  let data = await student_registered(req, res);
  
  if (data.success) {
    // res.json(data)
    res.redirect("/api/view_student");
    console.log(data.message);
  }
  if (!data.success) {

    res.status(404).json(data.data);
    console.log(data.message);
  }
};


exports.loginctrl = async (req, res) => {
  let data = await loginservice(req);
  if (data.success) {
    const dataa = data.data;
    res.status(201).json(dataa);
    console.log(data.message);
  }
  if (!data.success) {
    const dataa = data.data;
    res.status(404).json(dataa);
    console.log(data.message);
  }
};

exports.totalentryctrl = async (req, res) => {
  let data = await totalentryservice(req);
    if (data.success) {
        const dataa = data.data;
        const msg={
            "Total entries in database":dataa
        }
        res.status(201).json(msg);
   
        console.log(data.message);
    }
};


