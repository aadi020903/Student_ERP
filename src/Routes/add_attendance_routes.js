const express = require('express');
const add_attendance_routes = express.Router(); 



const {
    add_attendance,submitAttendance
} = require('../Controllers/add_attendance_controller');

add_attendance_routes.get('/add_attendance', add_attendance);
add_attendance_routes.post('/submitAttendance', submitAttendance);


module.exports = add_attendance_routes;
