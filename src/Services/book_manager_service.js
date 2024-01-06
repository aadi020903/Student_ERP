const book_model = require('../models/book_model');

exports.book_manager = async (req, res) => {
  try {
    const filterBookTitle = (req.query.filterBooktitle || '').trim();
    const filterAuthorName = (req.query.filterAuthorName || '').trim();
    const filterISBN = req.query.filterISBN ? req.query.filterISBN.trim() : null;
    const filterStatus = (req.query.filterStatus || '').trim();
    
    const filter = {};
    if (filterBookTitle) {
      filter.booktitle = { $regex: new RegExp(filterBookTitle, 'i') };
    }
    if (filterISBN) {
      filter.ISBN = filterISBN;
    }
    if (filterAuthorName) {
      filter.authorname = { $regex: new RegExp(filterAuthorName, 'i') };
    }
    if (filterStatus) {
      filter.status = filterStatus;
    }
    // Apply the filter to the userModel.find() query
    let data = [];
    if (Object.keys(filter).length > 0) {
      // If at least one filter is provided, apply the filter
      data = await book_model.find(filter);
    } else {
      // If no filters are provided, retrieve all users
      data = await book_model.find();
    }

    console.log("dsds", data);

    if (data) {
      return {
        message: "User is logged in",
        success: true,
        data: data,
        status: 200,
      };
    } else {
      return {
        message: "Invalid credentials",
        success: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
