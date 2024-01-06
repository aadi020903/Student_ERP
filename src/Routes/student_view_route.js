const express = require('express');
const view_student_router = express.Router();

const student_controller = require('../Controllers/student_view_controller.js');

// const checkAuthenticated = require("../../middleware/admin_auth");

view_student_router.get('/view_student', student_controller.view_student);

module.exports = view_student_router;