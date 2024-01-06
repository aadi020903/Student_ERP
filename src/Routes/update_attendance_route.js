const express = require('express');
const attendance_router = express.Router();
const {
    updateAttendance,
    update_attendance,
} = require('../Controllers/attendance_Controller.js');


attendance_router.post('/updateAttendance', updateAttendance);

attendance_router.get('/update_attendance', update_attendance);

