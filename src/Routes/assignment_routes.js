const express = require("express");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assignments");
  },
  filename: function (req, file, cb) {
    let studentClass = req.body.class;
    let subject = req.body.subject;
    let assignment_name = req.body.assignment_name;
    let assignmentName = studentClass+"_"+subject+"_"+assignment_name+"_"+file.originalname;
    cb(null, assignmentName); 
  },
});
const upload = multer({ storage: storage });
const {
  assignment_submit,
  assignment_submitted,
  assignment_view,
} = require("../Controllers/assignment_controller.js");

//teacher
router.get("/teacher_assignment_submit", assignment_submit);
router.post("/teacher_assignment_submitted",upload.single("assignment_file"), assignment_submitted);

// user
router.get("/student_assignment_view", assignment_view);

module.exports = router;
