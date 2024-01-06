
const mongoose = require('mongoose');
const LIBRARY_COLLECTION = process.env.DB_COLLECTION_LIBRARY;

const browsingHistorySchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: function() {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 15);
            return returnDate;
        }
    }
})

const librarySchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
     
    },
    feeStatus: {
        type: Boolean,
        default: false
    },
    browsingHistory: [browsingHistorySchema]
}, { timestamps: true });


module.exports  = mongoose.model(LIBRARY_COLLECTION, librarySchema);
