const dataModel = require("../models/student_model");
const adminModel = require('../models/admin_model');

const notificationModel = require('../models/notification_model');

const teacherNotificationModel = require('../models/teacher_notofication_model');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.student_notification = async (req,res)=>{
  try {
    const token = req.cookies.token;

    let admin = await adminModel.findOne({ authKey: token });
    if (admin) {
      return{
        success:true,
        admin:admin,
        message:"Admin Found",
        success:true,
      }
    } else {
      return{
        success:false,
        admin:[],
        message:"Admin Not Found",
        success:false,
    }
    }
  } catch (error) {
    console.log(error);
  }
}


exports.student_notification_post = async (req, res) => {
  try {

    const type = req.body.type;
    const Title = req.body.title;
    const Message = req.body.message;
    const Date = req.body.DOB;
    const Teacher = req.body.teacher;

    console.log("Herer");
    console.log(type);
    console.log(Title);
    console.log(Message);
    console.log(Date);
    console.log(Teacher);
    

    if(type=='Everyone') {
      console.log(type);
      let savedata = new notificationModel({
        type: type,
        title: Title,
        message: Message,
        date: Date,
        teacher: Teacher,
      });
     let saved_data = await savedata.save();
     if (saved_data) {
      return {
        success: true,
        data: saved_data,
        message: "Notification Sent Successfully",
      };
    }
    else {
      return {
        success: false,
        data: [],
        message: "Data not saved",
      };
    }
    } 

    else if(type=='Class') {
      const Class = req.body.class;
      console.log(Class);
      let savedata = new notificationModel({
        type: type,
        class: Class,
        title: Title,
        message: Message,
        date: Date,
        teacher: Teacher,
      });
     let saved_data = await savedata.save();
     if (saved_data) {
      return {
        success: true,
        data: saved_data,
        message: "Notification Sent Successfully",
      };
    }
    else {
      return {
        success: false,
        data: [],
        message: "Data not saved",
      };
    }
    } 

    else if( type=='Student') {
      const SID = req.body.SID;
      console.log(SID);
      let savedata = new notificationModel({
        type: type,
        sid: SID,
        title: Title,
        message: Message,
        date: Date,
        teacher: Teacher,
      });
     let saved_data = await savedata.save();
     if (saved_data) {
      return {
        success: true,
        data: saved_data,
        message: "Notification Sent Successfully",
      };
    }
    else {
      return {
        success: false,
        data: [],
        message: "Data not saved",
      };
    }
    }

    else if(type=='allTeachers') {
      console.log(type);
      let savedata = new teacherNotificationModel({
        type: type,
        title: Title,
        message: Message,
        date: Date,
        From: Teacher,
      });
     let saved_data = await savedata.save();
     if (saved_data) {
      return {
        success: true,
        data: saved_data,
        message: "Notification Sent Successfully",
      };
    }
    else {
      return {
        success: false,
        data: [],
        message: "Data not saved",
      };
    }
    } 

    else if(type=='particularTeacher') {
      console.log(type);
      const teacherId = req.body.teacherId;
      console.log(teacherId);
      let savedata = new teacherNotificationModel({
        type: type,
        title: Title,
        message: Message,
        date: Date,
        teacher: Teacher,
        teacherId: teacherId,
        From: Teacher,
      });
     let saved_data = await savedata.save();
     if (saved_data) {
      return {
        success: true,
        data: saved_data,
        message: "Notification Sent Successfully",
      };
    }
    else {
      return {
        success: false,
        data: [],
        message: "Data not saved",
      };
    }
    } 

  } catch (error) {
    console.log("Notification ", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

exports.student_notification_view  = async (req, res) => {
  try {
    const token = req.headers.token;
    console.log(token);

    let notification_data1 = await notificationModel.find({type:"Everyone"});
    console.log(notification_data1);

    let user = await dataModel.findOne({auth:token});
    console.log("User Sid",user.sid);
    console.log("User Class",user.class);

    let notification_data2 = await notificationModel.find({type:"Student",sid:user.sid});
    console.log(notification_data2);

    let notification_data3 = await notificationModel.find({type:"Class",class:user.class});
    console.log(notification_data3);

    if(notification_data1) {
      return {
        success: true,
        everyone_data: notification_data1,
        sid_data: notification_data2,
        class_data: notification_data3,
        message: "Notification Data"
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