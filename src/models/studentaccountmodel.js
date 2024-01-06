
const mongoose = require('mongoose');
const dbcollection = process.env.DB_COLLECTION_ACCOUNT;

// Define the schema for the student account model
const studentAccount = new mongoose.Schema({
    sid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});


// Create the student account model and collection
  

module.exports = mongoose.model(dbcollection, studentAccount);;
