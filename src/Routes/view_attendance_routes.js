const express = require('express');
const view_attendance_routes = express.Router(); 


const {
    view_attendance,
} = require('../Controllers/view_attendance_controller.js');

// const checkAuthenticated = require("../../middleware/admin_auth");

view_attendance_routes.get('/view_attendance', view_attendance);


module.exports = view_attendance_routes;
