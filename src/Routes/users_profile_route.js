const express = require('express');
const profile_router = express.Router();
const multer = require('multer');
const admin_auth = require('../../middleware/admin_auth')
const image =require("../../middleware/admin_multer")
const {
   
    users_get_profile,
    edit_profile_controller,} = require('../controllers/users_profile_controller')
   
profile_router.get('/users_profile',admin_auth,users_get_profile);
profile_router.post('/edit_profile',image,edit_profile_controller);



module.exports = profile_router;