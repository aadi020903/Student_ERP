const express = require("express");
const router = express.Router();

const {
    student_notification,
    student_notification_post,
    student_notification_view,
} = require("../Controllers/student_message_sender");

router.get("/student_notification", student_notification);
router.post("/student_notification_post", student_notification_post);

router.get("/student_notification_view", student_notification_view);


module.exports = router;
