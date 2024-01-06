const mongoose = require("mongoose");
const MONGO_URI = `${process.env.DB_URI_STUDENT}`;
exports.db_connect_student = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to student database");
    })
    .catch((err) => {
      console.log(err);
    });
};
