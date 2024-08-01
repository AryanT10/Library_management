const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },  // Title of the borrowed book
    bookISBN: { type: String, required: true },   // ISBN of the borrowed book
    borrowDate: { type: Date, default: Date.now }, // Date when the book was borrowed
    returnDate: { type: Date }                    // Date when the book was returned (null if not returned yet)
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
