const admin_model = require("../models/admin_model.js");
const bcrypt = require("bcryptjs");

exports.register_admin_service = async (req) => {
  try {
    const trypassword = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (trypassword !== confirmpassword) {
      return {
        success: false,
        message: "Password and confirm password does not match",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(trypassword, 10);

    const username = req.body.username;
    const password = hashedPassword;
    const email = req.body.email;
    const phone = req.body.phone;
    const data = {
      username: username,
      password: password,
      email: email,
      phone: phone,
      file: "profile.png",
    };
    const result = await admin_model(data);
    console.log(result);
    const saved = await result.save();

    if (!saved) {
      return {
        success: false,
        message: "Admin not created",
        data: [],
      };
    }
    if (saved) {
      return {
        success: true,
        message: "Admin created successfully",
        data: result,
      };
    }
  } catch (error) {
    console.log(`${error} hey `);
  }
};
