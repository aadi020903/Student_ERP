// const admin_model = require("../models/admin_model.js");
// const jwt = require('jsonwebtoken')
// require("cookie-parser");
// exports.adminLogout = async (req, res, next) => {
//     try {
//       const token = req.headers.token;
//       const user = await admin_model.findOne({ authKey : token}); // Find the user by authKey (token)
  
//       if (!user) {
        
//         return res.status(404).send('User not found');
//       }
  
     
//       user.authKey = ''; 
//       await user.save(); 
  
//       // Clear the Token cookie
//       res.clearCookie('token');
  
//       // Render the admin login view after successful logout
//       res.render('login_admin');
//       console.log("Successfully logged out");
//     } catch (error) {
//       console.error('Error logging out:', error);
//       return res.status(400).send('Error logging out');
//     }
//   };
  