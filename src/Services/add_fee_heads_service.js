const adminModel = require("../models/admin_model");
const feeHeadModel = require("../models/fee_head_model");
const student_model = require("../models/student_model");
const studentAccountModel = require("../models/studentaccountmodel");

exports.add_fee_heads = async (req, res) => {
  const token = req.cookies.token;
  try {
    let admin = await adminModel.findOne({ authKey: token });
    console.log(admin);
    if (admin) {
      return {
        admin,
        message: "Admin Found!",
        success: true,
      };
    } else {
      return {
        admin: [],
        message: "Admin Not Found!",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

exports.add_fee_heads_save = async (req, res) => {
  let name = req.body.fee_head_name;
  let amount = parseInt(req.body.amount);

  try {
    const students = await feeHeadModel.find({});
    let addedHead;
    // console.log(students);
    students.forEach(async (student) => {
      // console.log(student.quarters);
      student.quarters.forEach((quarter) => {
        // console.log(quarter);
        const newFeeHead = {
          name: name,
          amount: amount / 4,
        };
        quarter.feeHeads.push(newFeeHead);
      });
        addedHead = await student.save();
    });
    // console.log(addedHead);
    const studentAccount = await studentAccountModel.find({});
    let updatedAccount;
    // console.log(studentAccount);

    studentAccount.forEach(async (student) => {
      // console.log(student);
      student.totalAmount += amount;
      student.dueAmount += amount;

      updatedAccount = await student.save();
      // console.log(updatedAccount);
    });

    return {
      data: {
        updatedAccount,
        addedHead,
      },
      success: true,
      message: "Fee head added & Account Updated successfully",
    };
  } catch (error) {
    console.log(error);
  }
};
