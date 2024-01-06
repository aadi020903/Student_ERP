const AttendanceModel = require('../models/AttendanceModel');
const Student_model = require('../models/student_model');
const admin_model = require('../models/admin_model');
const jwt = require('jsonwebtoken');
exports.view_student_attendance_service = async (req, res) => {

    try {

      const token = req.headers.token;

      let student = await Student_model.findOne({ auth: token });

      console.log(student.sid);
      const student_class = student.class
      console.log(student_class);
      let stusent_attendance=[]
     let  Attendance = await AttendanceModel.findOne({
        currentClass: student_class,
      });
      // for(let i=0;i<Attendance.entries.length;i++){
      //   console.log(Attendance.entries[i].date);
      //   console.log(Attendance.entries[i].students);
      // }
      let user_cart = Attendance.entries.find(user_cartt =>{
        
        console.log(user_cartt.date);
        user_cartt.students.find(user_carttt=> 
        
        // console.log(user_carttt.sid)

        {
          if(user_carttt.sid==student.sid){
            console.log(user_carttt.status);
            stusent_attendance.push({date:user_cartt.date,status:user_carttt.status})
        }
      }
      
      
      )
    }
    )

    console.log(stusent_attendance);
      console.log("heloooo"+user_cart);
        // let teacher;
        // // Extract filter parameters from the query string
        // const filtername = req.query.filtername;
        // const filtersid = req.query.filtersid;
        // const filtercurrentClass = req.query.filterclass;

      
          

        
      
  
        // // Build the filter object based on the provided parameters
        // const filter = {};
        // if (filtername) {
        //   filter.name = { $regex: new RegExp(filtername, 'i') }; // Case-insensitive partial match
        // }
        // if (filtersid) {
        //   filter.sid = { $regex: new RegExp(filtersid, 'i') };
        // }
        // if (filtercurrentClass) {
        //   filter.currentClass = { $regex: new RegExp(filtercurrentClass, 'i') };
        // }
  
  
        // // Apply the filter to the userModel.find() query
        // let data = [];
        // if (Object.keys(filter).length > 0) {
        //   // If at least one filter is provided, apply the filter
        //   data = await AttendanceModel.find(filter);
        // } else {
        //   // If no filters are provided, retrieve all users
        //   data = await AttendanceModel.find();
        // }
  
        // console.log("dsds",data);
  
        if (stusent_attendance) {
          return {
            message: "user is logged in",
            success: true,
            data: stusent_attendance,
            status: 200,
          }
        } else {
          return {
            message: "invalid credentials",
            success: false,
            status: 300,
          };

      }
    } catch (error) {
      console.log("error", error);
    }
}