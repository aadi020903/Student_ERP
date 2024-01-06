// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const attendanceSchema = new Schema({
//   sid: { type: String, unique: true, required: true },
//   currentClassTeacher: { type: String, required: true },
//   currentClass: { type: String, required: true },
//   attendanceRecord: [
//     {
//       date: { type: Date, required: true, unique: true },
//       status: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
// });

// attendanceSchema.statics.upsertAttendance = async function (sid, updateData) {
//   const result = await this.updateOne({ sid }, updateData, { upsert: true });
//   return result;
// };

// module.exports = mongoose.model("Attendance", attendanceSchema);
