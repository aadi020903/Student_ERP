const studentAccModel = require("../models/studentaccountmodel");
const fee_head_model = require("../models/fee_head_model");
const studentModel = require("../models/student_model");
const adminModel = require("../models/admin_model");

exports.feesservice = async (req) => {
  try {
    const filtersid = req.query.sid;

    let filter = {};
    if (filtersid) {
      filter.sid = filtersid;
      console.log("Sid", filter.sid);
    }

    let foundUser;

    if (Object.keys(filter).length > 0) {
      foundUser = await dataModel.findOne(filter);

      let data = {
        sid: foundUser.sid,
        name: foundUser.name,
        email: foundUser.email,
        fathername: foundUser.fatherName,
        totalAmount: foundUser.totalAmount,
        paidAmount: foundUser.paidAmount,
        dueAmount: foundUser.dueAmount,
        busstatus: "unpaid",
        hostelstatus: "unpaid",
        eventstatus: "unpaid",
      };
      return {
        success: true,
        data: data,
        admin: admin,
      };
    } else {
      return {
        success: true,
        data: "",
      };
    }
  } catch (error) {
    console.log("Error in feesservice ", error);
    return {
      success: false,
      data: null,
    };
  }
};

exports.fee_submit = async (req, res) => {
  try {
    const token = req.cookies.token;

    let admin = await adminModel.findOne({ authKey: token });

    let feeRecord = await studentModel.aggregate([
      {
        $lookup: {
          from: "feestatuses",
          localField: "sid",
          foreignField: "sid",
          as: "fee",
        },
      },
      {
        $unwind: "$fee",
      },
      {
        $project: {
          sid: 1,
          name: 1,
          fatherName: 1,
          year: "$fee.year",
          quarters: "$fee.quarters",
        },
      },
    ]);
    if (feeRecord) {
      return {
        data: feeRecord,
        admin,
        message: "Record Found",
        success: true,
      };
    } else {
      return {
        data: [],
        message: "Record Not Found",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
exports.fee_submitted = async (req, res) => {
  let sid = req.body.student_id;
  let quarterNumber = req.body.quarter_number;

  try {
    let quarterFeeRecord = await fee_head_model.findOne({ sid });
    quarterFeeRecord.quarters[quarterNumber - 1].status = "paid";
    await quarterFeeRecord.save();

    let quarterPaidAmount = 0;
    quarterFeeRecord.quarters[quarterNumber - 1].feeHeads.forEach((head) => {
      quarterPaidAmount = quarterPaidAmount + head.amount;
    });

    let studentAcc = await studentAccModel.findOne({ sid });
    studentAcc.paidAmount = studentAcc.paidAmount + quarterPaidAmount;
    studentAcc.dueAmount = studentAcc.dueAmount - quarterPaidAmount;
    await studentAcc.save();

    // res.json(quarterFeeRecord)
    if (quarterFeeRecord) {
      return {
        data: quarterFeeRecord,
        message: "Record Updated",
        success: true,
      };
    } else {
      return {
        data: [],
        message: "Record Not Updated",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};