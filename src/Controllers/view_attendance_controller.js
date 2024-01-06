const {
  view_attendance_service,
} = require("../Services/view_attendance_service.js");
const { userprofile } = require("../services/users_profile_service");
exports.view_attendance = async (req, res) => {
  let data = await view_attendance_service(req, res);
  let dataadmin = await userprofile(req, res);

  if (data.success) {
    console.log("datadsdsds", data.data);
    res.render("view_attendance", { data: data.data, Dataad: dataadmin.data});
  } else {
    res.send("Error Happened");
  }
};
