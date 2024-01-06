
const studentModel = require("../models/student_model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv");

exports.student_login_save = async (req, res) => {
    // const firstname = req.body.firstname;
    let student_email = req.body.email;
      let password = req.body.password;
    console.log(student_email,password);
    // console.log(`${a_email} and password is ${password}`);
  
    try {
      let foundUser = await studentModel.findOne({ email: student_email });
      console.log(foundUser);
      if (foundUser) {
        console.log("foundUser");
        let result = await bcrypt.compare(password, foundUser.password);
        console.log("hhhhhh");
        if (result == true) {
          const token = await jwt.sign(
            {
              _id: foundUser._id,
            },
            process.env.SECRET_KEY,
            // {
            //   expiresIn:"90s"
            // }
          );
          await studentModel.findByIdAndUpdate(foundUser._id, { auth: token });
          res.cookie("token", token, {});
  
        //   let u_name = foundUser.u_name;
  
          // const token1 = token;
  
          return {
            // u_name: u_name,
            // token:token1,
            message: "User Found",
            success: true,
          };
        } else {
          return {
            message: "User Not Found INVALID CREDENTIALS",
            success: false,
          };
        }
      } else {
        return {
          message: "User Not Found INVALID CREDENTIALS",
          success: false,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };