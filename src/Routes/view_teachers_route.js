const express = require("express");
const router = express.Router();

let {
    teacher_manager,
    teacher_update,
    teacher_update_get,
} = require("../controllers/view_teacher_controller");

router.get("/view_teachers",teacher_manager);
router.post("/teacher_update",teacher_update);

router.get("/teacher_update",teacher_update_get);

module.exports = router;