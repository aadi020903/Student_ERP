const express = require('express');
const book_manager_router = express.Router();
const {
    book_manager,
} = require('../controllers/book_manager_controller');

book_manager_router.get('/book_manager', book_manager)
// user_manager_router.post('/user_manager_data', user_manager_data);

module.exports = book_manager_router;
