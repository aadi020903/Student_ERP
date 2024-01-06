const AttendanceModel = require("../models/AttendanceModel");
const StudentModel = require("../models/student_model");
const Teacher_model = require("../models/Teacher_Model");
const jwt = require("jsonwebtoken");
exports.add_attendance_service = async (req, res) => {
  try {
    // Extract filter parameters from the query string
    const filtername = req.query.filtername;
    const filtersid = req.query.filtersid;
    const filterclass = req.query.filterclass;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (filtername) {
      filter.name = { $regex: new RegExp(filtername, "i") }; // Case-insensitive partial match
    }
    if (filtersid) {
      filter.sid = { $regex: new RegExp(filtersid, "i") };
    }
    if (filterclass) {
      filter.class = { $regex: new RegExp(filterclass, "i") };
    }

    // Apply the filter to the userModel.find() query
    let data = [];
    if (Object.keys(filter).length > 0) {
      // If at least one filter is provided, apply the filter
      data = await StudentModel.find(filter);
    } else {
      data = await StudentModel.find();
    }

    if (data) {
      return {
        message: "user is logged in",
        success: true,
        data: data,
        status: 200,
      };
    } else {
      return {
        message: "invalid credentials",
        success: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log("error", error);
    res.send("error in add atendance service");
  }
};

function formatDate(dateString) {
  const date = new Date(dateString); // Convert the provided string to a Date object
  const day = String(date.getDate()).padStart(2, "0"); // Get day (with leading zero if needed)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (with leading zero if needed)
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
}
exports.storeAttendance = async (req, res) => {
  try {

    const token = req.headers.token;
    const formData = req.body;
    const date = formData.SelectedDate;
    const selectedDate = formatDate(formData.SelectedDate);
    const attendanceData = [];
    let data_entrise = [];
    let clas = "";
    let Attendance = "";
    let students = [];
    let count = 0;
    let class_count = 0;
    if(date!=undefined){

    
    // const _id = req.body._id
    const current_teacher = await Teacher_model.findOne({auth_key:token})
     console.log(current_teacher);
    const teacher_Id = current_teacher._id;
    const teacher_name = current_teacher.teacher_name
    const teacher_class = current_teacher.assigned_class

    for (const i in formData) {
      if (i.startsWith("attendance_")) {
       let classs = i.split("_")[2];
       console.log(classs);
          Attendance = await AttendanceModel.findOne({
          currentClass: classs,
        });
        if(teacher_class==classs){
          class_count=class_count+1
        }

      }
    }
  if(class_count!=0){
    console.log(Attendance);
      if (Attendance) {
        clas = Attendance.currentClass;
        // console.log(Attendance.entries);
        let formattedDate=[];
        for(let i=0;i<Attendance.entries.length;i++){
          console.log(Attendance.entries[i].date);
          formattedDate.push(Attendance.entries[i].date)
          if(date==Attendance.entries[i].date&&Attendance.entries[i].currentClassTeacher==teacher_name){
            console.log("date is present");
            count=count+1;
            return { success: false, message: "Data is already Present"  };
          }
        }
            console.log(count);
           if(count==0) {
              for (const i in formData) {
                if (i.startsWith("attendance_")) {
                  let classs = i.split("_")[2];
              
              const Attendance = await AttendanceModel.findOne({
                currentClass: classs,
              });
              let arr = {};
              data_entrise = Attendance.entries;
              let currentClassTeacher = teacher_name;
              const attendanceStatus = formData[i];
              const studentId = i.split("_")[1];
                students.push({ sid: studentId, status: attendanceStatus });
                arr.Teacher_id = teacher_Id;
                arr.currentClassTeacher = currentClassTeacher;
                arr.date = date;
                arr.students = students;
               
                data_entrise.push(arr);
               
            // }
            }
            }
            console.log(data_entrise);
            // for (const i in clas) {
              try {
                // let classss = clas[i];
                console.log(clas);
                await AttendanceModel.findOneAndUpdate(
                  { currentClass: clas },
                  { $set: { entries: data_entrise } }
                );
              } catch (error) {
                console.log(error);
              }
            // }
            return { success: true };
          }else{
            return { success: false,
            message: "Data is already Present" };
            console.log("date is alredy present");
          }
      }
  
    else{
  async function addAttendance( currentClass, branch, entries) {
    try {
      const newAttendance = new AttendanceModel({ 
        currentClass,
        branch,
        entries: entries.map(entries => ({
          Teacher_id: entries.teacherId,
          currentClassTeacher: entries.currentClassTeacher,
          date: entries.date,
          students: entries.students.map(student => ({
            sid: student.sid,
            status: student.status,
          })),
        })),
      });
  
      const result = await newAttendance.save();
      console.log('Attendance entries added successfully:', result);
    } catch (error) {
      console.error('Error adding attendance entries:', error);
    }
  }
  
  let student_class=""
  for(const k in formData){
    if (k.startsWith("attendance_")) {
      student_class = k.split("_")[2]
    }
  }
  // Example usage
    // const teacherId = teacher_Id;
  const currentClass = student_class;
  const branch = 'BranchA';
  let entries = [];
    const entry = {
      teacherId: teacher_Id,
      currentClassTeacher: teacher_name,
      date: date,
      students: []
    };
  
    // Loop to dynamically generate students for each entry
    for(const key in formData) {
      console.log(formData);
      if (key.startsWith("attendance_")) {
          entry.students.push({
        sid: key.split("_")[1],
        status: formData[key], // Example: alternate between Present and Absent
      });
    }
    }
    console.log(entry);
    entries.push(entry);
    addAttendance(currentClass, branch, entries);
    return { success: true };
  }
    }else{
      console.log("change teacher");
      return { success: false,
      message: "Changed Teacher " };
    }
  }
  else{
    return { success: false,
      message: "unable to fecth date from frontend" };
  }
 
    


  } catch (error) {
    console.error("Error in storeAttendanceService:", error);
    res.send({ error: error.message });
  }
};
