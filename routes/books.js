const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Middleware function to get a book by ID
async function getBook(req, res, next) {
	let book;
	try {
		book = await Book.findById(req.params.id);
		if (book == null) {
			return res.status(404).json({ message: 'Cannot find book' });
		}
	} catch (err) {
		console.error('Error finding book:', err);  // Add logging
		return res.status(500).json({ message: err.message });
	}

	res.book = book;
	next();
}

// Get all books
router.get('/', async (req, res) => {
	try {
		const books = await Book.find();
		// console.log(books);
		res.json(books);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get a book by ID
router.get('/:id', getBook, (req, res) => {
	res.json(res.book);
});

// Create a new book
router.post('/', async (req, res) => {
	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		ISBN: req.body.ISBN
	});

	try {
		const newBook = await book.save();
		res.status(201).json(newBook);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update a book by ID
router.put('/:id', getBook, async (req, res) => {
	if (req.body.title != null) {
		res.book.title = req.body.title;
	}
	if (req.body.author != null) {
		res.book.author = req.body.author;
	}
	if (req.body.ISBN != null) {
		res.book.ISBN = req.body.ISBN;
	}

	try {
		const updatedBook = await res.book.save();
		res.json(updatedBook);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete a book by ID
router.delete('/:id', getBook, async (req, res) => {
	try {
		console.log(`Deleting book with ID: ${req.params.id}`); // Logging the ID
		await Book.deleteOne({ _id: req.params.id });  // Use deleteOne instead of remove
		res.json({ message: 'Deleted Book' });
	} catch (err) {
		console.error('Error deleting book:', err);  // Add logging
		res.status(500).json({ message: err.message });
	}
});

// Borrow endpoint
router.post('/borrow', async (req, res) => {
    const { title, ISBN } = req.body;

    try {
        const book = await Book.findOne({ title, ISBN });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'No copies available to borrow' });
        }

        // Decrease the available copies
        book.availableCopies -= 1;
        await book.save();

        const transaction = new Transaction({
            bookTitle: title,
            bookISBN: ISBN,
            borrowDate: new Date(),
            returnDate: null // Ensure returnDate is null
        });
        await transaction.save();

        res.status(200).json({ message: 'Book borrowed successfully', transaction });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// The return endpoint
router.post('/return', async (req, res) => {
    const { title, ISBN } = req.body;
    
    try {
        const book = await Book.findOne({ title, ISBN });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Handle the return logic here
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/borrowed', async (req, res) => {
    try {
        const borrowedBooks = await Transaction.find({ returnDate: null });
        res.json(borrowedBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
