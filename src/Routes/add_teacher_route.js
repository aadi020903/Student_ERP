const express = require("express");
const router = express.Router();

let {
    add_teacher_get,
    teacher_register_save,
} = require("../Controllers/add_teacher_controller");

router.get("/add_teacher",add_teacher_get);
router.post("/teacher_register_save",teacher_register_save);


module.exports = router;