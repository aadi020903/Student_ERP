const adminModel = require("../models/admin_model");

exports.account_settings = async (req, res) => {
  try {
    const token = req.cookies.token;
    let data = await adminModel.findOne({ authKey: token });
    console.log(data);

    if (data) {
      return {
        data: data,
        success: true,
      };
    }
    else{
      return {
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
