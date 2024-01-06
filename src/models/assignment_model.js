const mongoose = require("mongoose");
const assignmentSchema = new mongoose.Schema({
  assignment_name: {
    type: String,
    required: true,
  },
  assignment_file: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  assignedDate:{
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    // required: true,
  },
  class: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("assignment", assignmentSchema);
