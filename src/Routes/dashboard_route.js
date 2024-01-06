const express = require("express");
const router = express.Router();

const { dashboard_service } = require("../Controllers/dashboard_controller");

router.post("/dashboard", dashboard_service);

module.exports = router;