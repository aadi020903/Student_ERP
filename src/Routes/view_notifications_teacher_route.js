const express = require("express");
const router = express.Router();

const {
    teacher_notification_view,
    teacher_notification_forward,
} = require("../Controllers/view_notifications_teacher_controller");

router.get("/teacher_notification_view", teacher_notification_view);
router.post("/teacher_notification_forward", teacher_notification_forward);

module.exports = router;
