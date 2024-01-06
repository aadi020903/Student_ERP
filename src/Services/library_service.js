const library_model = require("../models/library_model");
const bookModel = require("../models/book_model");
const studentModel = require("../models/student_model");

exports.library_service = async (req) => {
  // Trim the input values to remove leading and trailing white spaces
  const sid = (req.body.sid || "").trim();
  const bookId = (req.body.bookId || "").trim();
  const issued_date = Date.now();
  const return_date = req.body.return_date;

  try {
    const student = await studentModel.findOne({ sid });
    if (!student) {
      return {
        success: false,
        data: [],
        message: "Student not found",
      };
    }
    let book = await bookModel.findOne({ primarykey: bookId });
    if (!book) {
      return {
        success: false,
        data: [],
        message: "Book not found",
      };
    }
    if (book.availablecopies <= 0) {
      return {
        success: false,
        data: [],
        message: "Book is not available for issue. ",
      };
    }
    book.availablecopies -= 1;

    await book.save();

    const paidAmount = student.paidAmount;
    const totalAmount = student.totalAmount;
    let amounts = totalAmount / 4;
    const transactionid = student._id;
    console.log(transactionid);
    let feeStatus = true;
    if (paidAmount < amounts) {
      feeStatus = false;
    }

    let existingStudent = await library_model.findOneAndUpdate(
      { studentId: sid },
      {
        $set: { feeStatus: feeStatus },
        $set: { transactionId: transactionid },
        $push: {
          browsingHistory: {
            bookId,
            issuedDate: issued_date,
            returnDate: return_date,
          },
        },
      },
      { new: true, upsert: true }
    );

    if (!existingStudent) {
      return {
        success: false,
        data: [],
        message: "data not saved",
      };
    }

    return {
      success: true,
      data: existingStudent,
      message: "data saved",
    };
  } catch (error) {
    console.log("library service mei", error);
  }
};
