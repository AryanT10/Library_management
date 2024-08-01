const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

// Borrow a book
router.post('/borrow', async (req, res) => {
	const { title, ISBN } = req.body;

	try {
		const book = await Book.findOne({ title, ISBN });

		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		console.log(`Available copies of "${title}":`, book.availableCopies); // Log the available copies

		if (book.availableCopies <= 0) {
			return res.status(400).json({ message: 'No copies available to borrow' });
		}

		// Decrease the available copies
		book.availableCopies -= 1;
		await book.save();

		const transaction = new Transaction({
			bookTitle: title,
			bookISBN: ISBN,
			borrowDate: new Date()
		});
		await transaction.save();

		res.status(200).json({ message: 'Book borrowed successfully', transaction });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get('/borrowed', async (req, res) => {
	try {
		const borrowedBooks = await Transaction.find({ returnDate: null });
		res.json(borrowedBooks);  // Ensure JSON is returned
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Return a book
router.post('/return', async (req, res) => {
	const { title, ISBN } = req.body;

	try {
		// Find the transaction where the book was borrowed and not yet returned
		const transaction = await Transaction.findOne({ bookTitle: title, bookISBN: ISBN, returnDate: null });

		if (!transaction) {
			return res.status(404).json({ message: 'No active borrow found for this book' });
		}

		// Mark the transaction as returned
		transaction.returnDate = new Date();
		await transaction.save();

		// Find the book and increase the available copies
		const book = await Book.findOne({ title, ISBN });
		if (book) {
			book.availableCopies += 1;
			await book.save();
			console.log(`Available copies of "${title}":`, book.availableCopies); // Log the available copies
		}
		res.status(200).json({ message: 'Book returned successfully', transaction });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;