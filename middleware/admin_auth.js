
// const cookieParser = require("cookie-parser");



// // function checkAuthenticated(req, res, next) {
// //   // Check if user is already authenticated
// //   if (req.user) {
// //     // If already authenticated, proceed
// //     next();
// //     return;
// //   }

// //   // Check if on login route
// //   if (req.originalUrl === "/api/login_admin") {
// //     // If logging in, perform token verification instead of redirecting
// //     const token = req.headers.token;
// //     if (!token) {
// //       // No token on login route, redirect to login page
// //       return res.redirect("/api/login_admin");
// //     }

// //     try {
// //       // Verify token on login
// //       jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
// //         if (err) {
// //           // Invalid token on login, redirect to login page
// //           return res.redirect("/api/login_admin");
// //         } else {
// //           // Valid token on login, set user and proceed
// //           req.user = decoded;
// //           next();
// //         }
// //       });
// //     } catch (error) {
// //       console.log(error + "error in checkAuthenticated");
// //     }
// //   } else {
// //     // For non-login routes, use existing cookie and token checks
// //     // ... your existing token verification logic here ...
// //   }

// //   // Handle remaining cases and errors
// //   // ...
// // }

// // module.exports = checkAuthenticated;
// //

// const jwt = require("jsonwebtoken");
// const adminModel = require("../src/models/admin_model");

// async function checkAuthenticated(req, res, next) {
//   try {
//     // Check if user is already authenticated based on cookie and URL

//     if (req.headers.token && req.headers.token !== "") {
//       const token = req.headers.token;
//       const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Token found, verifying...");
//       req.user = await adminModel.findOne({ _id });

//       if (req.user) {
//         next();
//         return; // Avoid double processing for already authenticated users
//       } else {
//         console.log("Invalid user data found in token on protected route.");
//         res.redirect("/api/login_admin");
//       }
//     } else if (req.originalUrl === "/api/login_admin") {
//       // Special handling for login route

//       const token = req.headers.token;
//       if (token) {
//         try {
//           // Verify token on login attempt
//           jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//               console.log("Invalid token found on login attempt.");
//               res.redirect("/api/login_admin");
//             } else {
//               // Login attempt with valid token, handle it based on your logic
//               // (e.g., redirect to admin page or send additional info)
//               console.log("Valid token found on login attempt, handling user...");
//               req.user = decoded;
//               // TODO: implement your specific login logic here
//               // next();
//             }
//           });
//         } catch (error) {
//           console.error("Error during token verification on login:", error);
//           res.redirect("/api/login_admin");
//         }
//       } else {
//         // No token on login route, proceed normally
//         next();
//       }
//     } else {
//       // Non-login and non-protected routes
//       next();
//     }
//   } catch (error) {
//     console.error("General error during authentication:", error);
//     res.redirect("/register_admin");
//   }
// };


// module.exports = checkAuthenticated;


// const jwt = require("jsonwebtoken");
// const userModel = require("../src/model/user_model");

const jwt = require("jsonwebtoken");
const userModel = require("../src/models/admin_model");
const auth = async (req, res, next) => {

  try {
    console.log("-------------req.url--------------------------",req.url);
    // const token = req.header("Authorization").replace("Bearer ", "");
    console.log("verify", token);
    // const token = req.headers.token;
    const token = req.cookies.token;
    console.log("auth token",token);
    console.log(process.env.SECRET_KEY);

    if (!token) {
      // throw new Error();
      res.redirect("/api/login_admin")
    } else if(token) {

    

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log("decoded from auth",decoded);
    
    let data = await userModel.findOne({_id:decoded._id});
    console.log("data from auth",data);
    if (data.status == "blocked") {
      return res.status(401).json(
        Object.assign(
          { success: false },
          {
            status: false,
            msg: "User is blocked",
          }
        )
      );
    }


    req.user = decoded;
    next();
  }
  else if(!data) {
    // throw new Error();
  } 
} catch (e) {
  console.log("error from auth",e);
  token = {
    status: false,
    msg: "Invalid Token",
  };
  res.redirect("/api/login_admin")
    // return res.status(401).json(Object.assign({ success: false }, token));

  }
};
module.exports = auth;



