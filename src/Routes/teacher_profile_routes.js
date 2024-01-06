const express = require("express");
const router = express.Router();
const multer = require("multer");

// Remove multer().none() from global middleware
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/teacher_profile");
  },
  filename: function (req, file, cb) {
    let email = (req.body.email).trim();
    const username = email.slice(0, email.indexOf('@'));
    let imageName = username+"_"+file.originalname;
    cb(null, imageName);
  },
});
const upload = multer({ storage: storage });

const {
  teacher_profile,
  teacher_profile_update,
  teacher_profile_updated,
} = require("../Controllers/teacher_profile_controller");

router.get("/teacher_profile", teacher_profile);
router.get("/teacher_profile_update", teacher_profile_update);

// Apply multer middleware specifically for this route
router.post("/teacher_profile_updated", upload.single('image'), teacher_profile_updated);

module.exports = router;
