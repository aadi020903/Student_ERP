const {
  add_attendance_service,storeAttendance
} = require("../Services/add_attendance_service");
const { userprofile} = require("../services/users_profile_service");

exports.add_attendance = async (req, res) => {
  let dataadmin = await userprofile(req, res);

  let data = await add_attendance_service(req, res);
  console.log("success",data);
try {
  
    if (data.success) {
      // console.log("datadsdsds", data.data);
      // res.send("hi")
      // res.render("add_attendance", { data: data.data, Dataad: dataadmin.data });
      // console.log(data.class);
      res.render("add_attendance", { data: data.data, Dataad: dataadmin.data});
  
    } else {
      res.send("Error Happened",data.message);
    }
} catch (error) {
  res.send("Error Happened in try add attendance");
}
};

//
// Your controller code

// Your controller code



exports.submitAttendance = async (req, res) => {
  try {
    let data = await storeAttendance(req,res)
    console.log(data);
    // Access the form data from the request body
    if(data.success){

      res.send('Attendance submitted successfully');
    }
    else if(!data.success){
      // console.log("errror");
      res.send(data.message);
    }

    // Call your service to handle the attendance submission

    
  } catch (error) {
    console.error('Error submitting attendance:', );
  }
};


