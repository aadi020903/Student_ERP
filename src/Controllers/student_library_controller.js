const { bookIssueDetails } = require("../Services/student_library_service");

exports.bookIssueDetails = async (req, res) => {
  let data = await bookIssueDetails(req, res);
  if (data.success) {
    res.status(201).json({ bookData: data.bookData });
} else {
      res.send(data.message);
  }
};
