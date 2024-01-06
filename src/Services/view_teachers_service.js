const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let mongoose = require("mongoose");

let teacherModel = require('../models/Teacher_Model');

exports.teacher_manager = async (req,res) => {
    try{
        let teacher_data =  await teacherModel.find();
          // console.log(teacher_data);
    
      if(teacher_data){
          return {
            data:teacher_data,
            message: "View All Teachers",
            success: true,
          };
        } else {
          return {
            message: "Something Went Wrong",
            success: false,
          };
        }
      }
     catch (error) {
      console.log("error", error);
    }
  };


  exports.teacher_update = async (req,res) => {
    try {

      let page_name = req.query.pageName;
      let id=req.body.id;

      if(page_name=='Status') {

      let status = "Blocked";
  
      let updatedata = await teacherModel.findById({_id:id});
      let status2 = status.localeCompare(updatedata.status);
  
      if(status2 == 0){
        let updatedata = await teacherModel.findByIdAndUpdate({_id:id},{
          status: "Active",
        });
      }
      else {
        let updatedata = await teacherModel.findByIdAndUpdate({_id:id},{
          status: "Blocked",
        });
      }
      
      if (updatedata)
        return {
          message: "Teacher Status Changed Successfully",
          data: updatedata,
          success: true,
        };
      else {
        return {
          message: "Error Happened",
          success: false,
        };
      }
    } else if(page_name=='Update') {

      let teacher_name = req.body.teacher_name;
      let mobile = req.body.mobile;
      let address = req.body.address;
      let assigned_class = req.body.assigned_class;

      let anyTeacher = await teacherModel.findOne({assigned_class:assigned_class});

      if(anyTeacher) {

        return {
          message: "This class is already assigned to a teacher",
          success: false,
        };
      
        
      } else {
        let updatedata = await teacherModel.findByIdAndUpdate({_id:id},{
          teacher_name: teacher_name,
          mobile: mobile,
          address: address,
          assigned_class:assigned_class,
        });
        let update_data = await updatedata.save();
        if (update_data)
        return {
          message: "Teacher Updated Successfully",
          data: updatedata,
          success: true,
        };
        else {
          return {
            message: "Error Happened",
            success: false,
          };
        }
      }
    }
    } catch (error) {
      console.log("error", error);
    }
  };


  exports.teacher_update_get = async (req,res) => {
    try{

      let id = req.query.id;

        let teacher_data =  await teacherModel.findById({_id:id});
          console.log(teacher_data);
    
      if(teacher_data){
          return {
            data:teacher_data,
            message: "View All Teachers",
            success: true,
          };
        } else {
          return {
            message: "Something Went Wrong",
            success: false,
          };
        }
      }
     catch (error) {
      console.log("error", error);
      
    }
  };