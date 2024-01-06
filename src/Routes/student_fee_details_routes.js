const express = require('express');
const router = express.Router();
const { getStudentFeeDetails,
    getStudentDueFeeDetails
 } = require('../Controllers/student_fee_details_controller')

router.get('/student_fee_details',getStudentFeeDetails);
router.get('/student_due_fee_details',getStudentDueFeeDetails);

module.exports = router;