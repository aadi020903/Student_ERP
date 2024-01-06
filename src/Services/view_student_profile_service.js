const studentModel = require("../models/student_model");
// const addressModel = require("../model/address_model");


exports.student_profile = async (req) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        // const sid = req.body.sid
        // console.log(sid);
        let student_data1 = await studentModel.findOne({ auth: token });
        console.log("student_data1",student_data1);
  
        const student_data = {
          name : student_data1.name,
          mobile : student_data1.phone,
          email : student_data1.email,
          address : student_data1.address,
          state : student_data1.state,
          city : student_data1.city,
          pincode : student_data1.pincode,
          sid : student_data1.sid,
          regdate : student_data1.date,
          batch : student_data1.batch,
          class : student_data1.class,
          branch : student_data1.branch,
          gender : student_data1.gender,
          DOB : student_data1.DOB,
          fathername : student_data1.fatherName,
          mothername : student_data1.motherName,
        //   image : student_data1.image,
        }
  
        if (student_data) {
          return {
            message: "data fetched successfully",
            data: student_data,
            success: true,
          };
        } else {
          return {
            message: "data did not fetch",
            data: [],
            success: false,
          };
      }
    } catch (error) {
      console.log(error);
    }
  };