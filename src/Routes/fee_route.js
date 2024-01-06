const express = require('express');
const router = express.Router();
const {fee_submit_controller, fee_submitted_controller} = require('../Controllers/fees_controller');


router.get("/fee_submit",fee_submit_controller);
router.post("/fee_submitted",fee_submitted_controller);

module.exports = router