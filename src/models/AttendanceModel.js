const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
 
  currentClass: { type: String, required: true },
  branch:{type: String, required: true},
  entries: [
    { 
      Teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
      currentClassTeacher: { type: String, required: true },
      date: { type: String, required: true },
      students: [
        {
          sid: { type: String, required: true },
          status: {
            type: String,
            enum: ["Present", "Absent"],
            required: true,
          },
          // attendanceRecord: [
          //   {
          //     status: {
          //       type: String,
          //       enum: ["Present", "Absent"],
          //       required: true,
          //     },
          //   },
          // ],
        },
      ],
    },
  ],
});

// attendanceSchema.statics.upsertAttendance = async function (sid, updateData) {
//   const result = await this.updateOne({ sid }, updateData, { upsert: true });
//   return result;
// };

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = AttendanceModel;
