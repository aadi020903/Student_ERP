const mongoose = require("mongoose");

const examReportSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
  },
  reports: [
    {
      report_name: {
        type: String,
        required: true,
      },
      report_file: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = mongoose.model("examReport", examReportSchema);
