const express = require("express");
const teacher_login_route = express.Router();
const {
  teacher_login_post,
} = require("../Controllers/teacher_login_controller.js");

teacher_login_route.post("/teacher_login", teacher_login_post);

module.exports = teacher_login_route;
