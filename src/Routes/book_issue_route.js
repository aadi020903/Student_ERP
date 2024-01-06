const express = require('express');
const issue_router = express.Router();
const {
    book_issue,
    book_issue_data
} = require('../controllers/book_issue_controller.js');
const { render } = require('ejs');
issue_router.post('/book_issue_data', book_issue_data);
issue_router.get('/book_issue', book_issue)

module.exports = issue_router;