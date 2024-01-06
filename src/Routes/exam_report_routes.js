const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuthenticated = require("../../middleware/admin_auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/exam_reports");
  },
  filename: function (req, file, cb) {

    let sid = req.body.sid;
    console.log(sid);
    let reportName = sid+"_"+file.originalname;
    cb(null, reportName); 
  },
});
const upload = multer({ storage: storage });
const {
  exam_report_submit,
  exam_report_submitted,
  exam_report_view
} = require("../Controllers/exam_report_controller");

router.get("/exam_report_submit", exam_report_submit);
router.post(
  "/exam_report_submitted",
  upload.single("report_file"),
  exam_report_submitted
);

router.get('/exam_report_view',exam_report_view)

module.exports = router;
