const {
  getStudentFeeDetails,
  getStudentDueFeeDetails,
  getStudentPayFeeDetails,
} = require("../Services/student_fee_details_service");

exports.getStudentFeeDetails = async (req, res) => {
  try {
    let data = await getStudentFeeDetails(req, res);
    if (data.success) {
      res.status(201).json({
        feeDetails: data.feeDetails,
      });
    } else {
      res.status(404).json("Failure Occured");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getStudentDueFeeDetails = async (req, res) => {
  try {
    let data = await getStudentDueFeeDetails(req, res);
    if (data.success) {
      res.json({ dueFee: data.dueFee });
    } else {
      res.send("Failure Occured");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getStudentPayFeeDetails = async (req, res) => {
  try {
    let data = await getStudentPayFeeDetails(req, res);
    if (data.success) {
      res.json({ payfee: data.payFee });
    } else {
      res.send("Failure Occured");
    }
  } catch (error) {
    console.log(error);
  }
};
