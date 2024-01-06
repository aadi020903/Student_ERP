
const express = require('express');
const attendance_router = express.Router();
const attendanceController = require('../controllers/attendanceController');

attendance_router.post('/updateAttendance', attendanceController.updateAttendance);
attendance_router.get('/viewAttendanceByTeacher/:teacherId/:date', attendanceController.viewAttendanceByTeacher);
attendance_router.get('/viewAttendanceByStudent/:sid', attendanceController.viewAttendanceByStudent);


module.exports = attendance_router;
