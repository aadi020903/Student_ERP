require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { db_connect_student } = require("./src/DB/student_db");
const path = require("path");



db_connect_student();
app.use("/public", express.static("public"));
const bodyParser = require("body-parser");
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "src/views"));
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");

// app.use(checkAuthenticated)
app.use("/api", require("./src/Routes/fee_route"));
app.use("/api", require("./src/Routes/student_register_route"));
app.use("/api", require("./src/Routes/dashboard_route"));
app.use("/api", require("./src/Routes/account_settings_routes"));
app.use("/api", require("./src/Routes/student_fee_details_routes"));
app.use("/api", require("./src/Routes/student_library_routes"));
app.use("/api", require("./src/Routes/student_login_routes"));
app.use("/api", require("./src/Routes/exam_report_routes"));
app.use("/api", require("./src/Routes/assignment_routes.js"));
app.use("/api", require("./src/Routes/student_message_sender"));
app.use("/api", require("./src/Routes/view_student_attendance_routes"));
app.use("/api", require("./src/Routes/add_teacher_route"));
app.use("/api", require("./src/Routes/view_teachers_route"));
app.use("/api", require("./src/Routes/view_student_profile_routes"));
app.use("/api", require("./src/Routes/view_attendance_teacher_side_routes.js"));
app.use("/api", require("./src/Routes/view_notifications_teacher_route"));
app.use("/api", require("./src/Routes/routes"));
app.use("/api", require("./src/Routes/attendanceRoutes"));
app.use("/api", require("./src/Routes/login_admin"));
app.use("/api", require("./src/Routes/register_admin"));
app.use("/api", require("./src/Routes/add_attendance_routes"));
app.use("/api", require("./src/Routes/student_view_route"));
app.use("/api", require("./src/Routes/view_attendance_routes"));
app.use("/api", require("./src/Routes/users_profile_route"));
app.use("/api", require("./src/Routes/exam_report_routes"));
app.use("/api", require("./src/Routes/assignment_routes.js"));
app.use("/api", require("./src/Routes/teacher_profile_routes.js"));
app.use("/api", require("./src/Routes/teacher_login_route.js"));
app.use("/api", require("./src/Routes/view_all_students_route.js"));
app.use("/api", require("./src/Routes/add_books"));
app.use("/api", require("./src/Routes/book_issue_route"));
app.use("/api", require("./src/Routes/book_manager_routes"));
app.use("/api", require("./src/Routes/add_fee_heads_routes"));
app.use("/api", require("./src/Routes/logout_admin_route.js"));

// app.use("/api", Admin_post_logout)
app.post('/set-cookie', (req, res) => {
  // Set a cookie named 'test' with the value 'yourTokenValue'


  // Send a response
  res.send('Cookie set successfully!');
});

app.listen(PORT, () => {
  console.log(
    `Server running on port http://localhost:${PORT}/api/login_admin`
  );
});
