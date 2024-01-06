const mongoose = require("mongoose");
const MONGO_URI = `${process.env.DB_URI}/${process.env.DB_LIBRARY}`;
exports.db_connect_library = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to library database");
    })
    .catch((err) => {
      console.log(err);
    });
};
