const express = require('express');
const view_student_attendance_routes = express.Router(); 


const {
    view_student_attendance,
} = require('../Controllers/view_attendance_teacher_side_controllers');

// const checkAuthenticated = require("../../middleware/admin_auth");

view_student_attendance_routes.get('/view_attendance_teacher_side', view_student_attendance);


module.exports = view_student_attendance_routes;
