const {bookRegister_get_Controller,bookRegister_post_Controller}= require('../controllers/add_book_controller.js')
const express = require('express');
const add_book_router = express.Router();
// const auth =require("../middleware/auth_")
add_book_router.get('/add_books',bookRegister_get_Controller);
add_book_router.post('/add_books_data',bookRegister_post_Controller);


module.exports = add_book_router;