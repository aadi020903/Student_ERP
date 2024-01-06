const express = require('express');
const view_student_attendance_routes = express.Router(); 


const {
    view_student_attendance,
} = require('../Controllers/view_student_attendance_controller');

// const checkAuthenticated = require("../../middleware/admin_auth");

view_student_attendance_routes.get('/view_student_attendance', view_student_attendance);


module.exports = view_student_attendance_routes;
