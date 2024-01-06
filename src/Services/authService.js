const jwt = require('jsonwebtoken');
const User = require('../models/admin_model'); // Replace with the actual path

exports.AuthService = async(req,res)=> {
 
  try {
    const token = req.cookies.token; // Replace 'token' with your actual cookie name
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Clear the authKey in your database (assuming you have a User model)
    // Replace 'User' with your actual Mongoose model
    const updatedUser = await User.findByIdAndUpdate(
      decoded,
      { authKey: null },
      { new: true } // Return the updated document
    );
    console.log(updatedUser);

    res.clearCookie("token");

    return{
      success: true,
    }
  } catch (error) {
    console.log(error);
  }

}