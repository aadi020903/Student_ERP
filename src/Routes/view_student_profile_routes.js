const express = require("express");
const user_auth = require("../../middleware/user_auth");

const student_profile_router = express.Router();

const {
    student_profile,
  } = require('../Controllers/view_student_profile_controller');

  student_profile_router.get('/student_profile', student_profile);

  module.exports = student_profile_router;