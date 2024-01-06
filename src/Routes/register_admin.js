const express = require('express');
const admin_router = express.Router();
const {
    register_admin,
    register_admin_data
} = require('../controllers/register_admin_controller');

// const checkAuthenticated = require("../../middleware/admin_auth");
admin_router.get('/register_admin', register_admin)
admin_router.post('/register_admin_data', register_admin_data);


module.exports =admin_router;