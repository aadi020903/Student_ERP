const dataModel = require("../models/student_model");
const bcrypt = require("bcryptjs");

exports.updateservice = async (req, res) => {
    try {
      const filter = { sid: req.body.sid };
      const update = {};
      if (req.body.name) update.name = req.body.name;
      if (req.body.email) update.email = req.body.email;
      if (req.body.phone) update.phone = req.body.phone;
      if (req.body.course) update.course = req.body.course;
      if (req.body.branch) update.branch = req.body.branch;
      if (req.body.DOB) update.DOB = req.body.DOB;
      if (req.body.password)
        update.password = await bcrypt.hash(req.body.password, 10);
  
      let updatedUser = await dataModel.findOneAndUpdate(filter, update, {
        new: true,
      });
    if(updatedUser)
    {
        return{
            success:true,
            data:updatedUser,
            message : "Data updated successfully"
          }
    }
    if(!updatedUser)
    {
        return{
            success:false,
            data:[],
            message : "User not found"
          }
    }
    } catch (error) {
      console.log("here brother in update ", error);
    }
  };  
  
  