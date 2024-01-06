const AttendanceModel = require('../models/AttendanceModel');
const Student_model = require('../models/student_model');
const Teacher_Model = require('../models/Teacher_Model');
const jwt = require('jsonwebtoken');
exports.view_student_attendance_service = async (req, res) => {

    try {

      const token = req.headers.token;
        // const _id = req.body._id
        const Date = req.query.Date;
        console.log(Date);
      let Teacher = await Teacher_Model.findOne({ auth_key: token});

      console.log(Teacher);
      const Teacher_class = Teacher.assigned_class
      console.log(Teacher_class);
      let stusent_attendance=[]
      let stusent_attendance_data=[]
     let  Attendance = await AttendanceModel.findOne({
        currentClass: Teacher_class,
      });
      console.log("Attendance",Attendance);
      let user_cart = Attendance.entries.find(user_cartt =>{
        
        console.log(user_cartt.date);
        if(user_cartt.currentClassTeacher==Teacher.teacher_name){

            user_cartt.students.find(user_carttt=> 
        
                // console.log(user_carttt.sid)
        
                {
                //   if(user_carttt.sid==student.sid){
                    console.log(user_carttt.status);
                    stusent_attendance.push({date:user_cartt.date,sid:user_carttt.sid,status:user_carttt.status})
                }
            //   }
              
              
              )
        }
  
    }
    )
    let totel_present_student=0;
    let totel_Absent_student=0;
    let present_student =[]
    let Absent_student =[]
    const totel_student = stusent_attendance.find((totel_student)=>{
        console.log("totel_present_student"+totel_student.status);
        if(totel_student.status=="Present"&&totel_student.date==Date){
            totel_present_student=totel_present_student+1
            present_student.push(totel_student.sid)
        }else if(totel_student.status=="Absent"&&totel_student.date==Date){
            Absent_student.push(totel_student.sid)
            totel_Absent_student=totel_Absent_student+1
        }
    })
    console.log(present_student);
    console.log(Absent_student);
    let present_student_name =[]
    let absent_student_name =[]
    for(const i in present_student){
        let sid=present_student[i]
        let  Student = await Student_model.findOne({
            sid: sid,
          });
          console.log(Student.name);
          present_student_name.push(Student.name)
    }
    for(const i in Absent_student){
        let sid=Absent_student[i]
        let  Student = await Student_model.findOne({
            sid: sid,
          });
          console.log(Student.name);
          absent_student_name.push(Student.name)
    }
    console.log("totel_present_student="+totel_present_student);
    console.log("totel_Absent_student="+totel_Absent_student);
    console.log(stusent_attendance);
      
    stusent_attendance_data.push({totel_present_student:totel_present_student,totel_Absent_student:totel_Absent_student,present_student_sid:present_student,Absent_student_sid:Absent_student,present_student_name:present_student_name,absent_student_name:absent_student_name})

        if (stusent_attendance_data) {
          return {
            message: "user is logged in",
            success: true,
            data: stusent_attendance_data,
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