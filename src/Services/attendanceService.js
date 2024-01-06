

const AttendanceModel = require('../models/AttendanceModel');
const TeacherModel = require('../models/Teacher_Model');
const StudentModel = require('../models/student_model');

async function updateAttendance(sid, date, status) {
  try {
    const result = await AttendanceModel.upsertAttendance(sid, {
      $push: {
        attendanceRecord: { date, status },
      },
    });
    return result;
  } catch (error) {
    throw new Error(`Error updating attendance: ${error.message}`);
  }
}

async function viewAttendanceByTeacher(teacherId, date) {
  try {
    const teacher = await TeacherModel.findById(teacherId);
    const currentClass = teacher.currentClass;

    const result = await AttendanceModel.aggregate([
      {
        $match: {
          currentClass,
          'attendanceRecord.date': new Date(date),
        },
      },
      {
        $lookup: {
          from: 'students',
          localField: 'sid',
          foreignField: 'sid',
          as: 'studentInfo',
        },
      },
      {
        $project: {
          sid: 1,
          name: { $arrayElemAt: ['$studentInfo.name', 0] },
          email: { $arrayElemAt: ['$studentInfo.email', 0] },
          attendanceRecord: {
            $filter: {
              input: '$attendanceRecord',
              as: 'record',
              cond: { $eq: ['$$record.date', new Date(date)] },
            },
          },
        },
      },
    ]);

    return result;
  } catch (error) {
    throw new Error(`Error fetching attendance: ${error.message}`);
  }
}

async function viewAttendanceByStudent(sid) {
  try {
    const result = await AttendanceModel.aggregate([
      {
        $match: {
          sid,
        },
      },
      {
        $lookup: {
          from: 'teachers',
          localField: 'currentClassTeacher',
          foreignField: 'name',
          as: 'teacherInfo',
        },
      },
      {
        $project: {
          sid: 1,
          currentClass: 1,
          attendanceRecord: 1,
          teacherInfo: {
            name: 1,
            email: 1,
            gender: 1,
            phone: 1,
            subject: 1,
          },
        },
      },
    ]);

    return result;
  } catch (error) {
    throw new Error(`Error fetching attendance: ${error.message}`);
  }
}

module.exports = { updateAttendance, viewAttendanceByTeacher, viewAttendanceByStudent };
