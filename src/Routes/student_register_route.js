const express = require("express");
const router = express.Router();

const {
  student_register,
  student_registered,
} = require("../Controllers/validation_controller");

router.get("/student_register", student_register);
router.post("/student_registered", student_registered);

module.exports = router;
