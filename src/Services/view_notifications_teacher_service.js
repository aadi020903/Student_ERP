const teacherModel = require("../models/Teacher_Model");

const notificationModel = require('../models/notification_model');

const teacherNotificationModel = require('../models/teacher_notofication_model');

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.teacher_notification_view  = async (req, res) => {
    try {
      const token = req.headers.token;
      console.log("token from teacher noti",token);
  
      let allTeacherData = await teacherNotificationModel.find({type:"allTeachers"});
      console.log(allTeacherData);
  
      let teacher = await teacherModel.findOne({auth_key:token});
      console.log("Teacher ID",teacher._id);
  
      let one_teacher = await teacherNotificationModel.find({type:"particularTeacher",teacherId:teacher._id});
      console.log(one_teacher);
  
      if(allTeacherData) {
        return {
          success: true,
          allTeacherData: allTeacherData,
          one_teacher: one_teacher,
          message: "Teacher Notification Data"
        }
      }
      else {
        return {
          success: false,
          message: "Not Found"
        }
      }
  
    } catch(error) {
      res.send("Error Happened");
    }
  }

  exports.teacher_notification_forward = async(req,res) => {
    try {

        const token = req.headers.token;

        let teacher = await teacherModel.findOne({auth_key:token});
        console.log("Class :",teacher.assigned_class);

        let _id = req.body.messageId;

        let message = await teacherNotificationModel.findOne({_id:_id});

        let forwardData = new notificationModel({
            type: "Class",
            class: teacher.assigned_class,
            title: message.title,
            message: message.message,
            date: message.date,
            teacher: teacher.teacher_name,
        })
     let saved_data = await forwardData.save();

     if(saved_data) {
        return {
            success: true,
            message: "Message Forwarded Successfully",
        }
     } else {
        return {
            success: false,
            message: "Something Went Wrong",
        }
     }
    } catch(error) {
        console.log("Error happened", error);
    }
  }