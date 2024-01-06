const express = require('express');
const router = express.Router();

const {add_fee_heads, add_fee_heads_save} = require('../Controllers/add_fee_heads_controller');

router.get('/add_fee_heads',add_fee_heads);
router.post('/add_fee_heads_save',add_fee_heads_save);

module.exports = router