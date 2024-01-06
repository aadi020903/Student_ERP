const express = require("express");
const view_students_route = express.Router();

const {view_all_students} = require("../Controllers/view_all_students_controller");

view_students_route.get("/view_all_students",view_all_students);

module.exports = view_students_route;
