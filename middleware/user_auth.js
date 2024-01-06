// const jwt = require("jsonwebtoken");
// const userModel = require("../src/model/user_model");

const jwt = require("jsonwebtoken");
const userModel = require("../src/models/student_model");
const auth = async (req, res, next) => {
  try {
    //console.log("-------------req.url--------------------------",req.url);
    // const token = req.header("Authorization").replace("Bearer ", "");
    // console.log("verify", token);
    const token = req.headers.token;
    console.log(token);
    console.log(process.env.SECRET_KEY);
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

    if (!decoded) {
      throw new Error();
      
    }
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    token = {
      status: false,
      msg: "Invalid Token",
    };
    return res.status(401).json(Object.assign({ success: false }, token));
  }
};
module.exports = auth;