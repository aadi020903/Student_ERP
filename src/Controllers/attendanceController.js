

const attendanceService = require('../services/attendanceService');

async function updateAttendance(req, res) {
  const { sid, date, status } = req.body;

  try {
    const result = await attendanceService.updateAttendance(sid, date, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function viewAttendanceByTeacher(req, res) {
  const { teacherId, date } = req.params;

  try {
    const result = await attendanceService.viewAttendanceByTeacher(teacherId, date);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function viewAttendanceByStudent(req, res) {
  const { sid } = req.params;

  try {
    const result = await attendanceService.viewAttendanceByStudent(sid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { updateAttendance, viewAttendanceByTeacher, viewAttendanceByStudent };


