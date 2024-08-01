const mongoose = require('mongoose');
const Book = require('../models/Book');

require('dotenv').config();
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://aryantuwar676:ViLFZM7f4pbcw5JF@libmanagement.9lzxmjg.mongodb.net/?retryWrites=true&w=majority&appName=LibManagement';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection error:', err));

	const books = [
		{ title: 'To Kill a Mockingbird', author: 'Harper Lee', ISBN: '9780060935467', availableCopies: 4 },
		{ title: '1984', author: 'George Orwell', ISBN: '9780451524935', availableCopies: 5 },
		{ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', ISBN: '9780743273565', availableCopies: 3 },
		{ title: 'Pride and Prejudice', author: 'Jane Austen', ISBN: '9781503290563', availableCopies: 7 },
		{ title: 'The Catcher in the Rye', author: 'J.D. Salinger', ISBN: '9780316769488', availableCopies: 6 },
		{ title: 'The Hobbit', author: 'J.R.R. Tolkien', ISBN: '9780547928227', availableCopies: 5 },
		{ title: 'Fahrenheit 451', author: 'Ray Bradbury', ISBN: '9781451673319', availableCopies: 4 },
		{ title: 'Moby Dick', author: 'Herman Melville', ISBN: '9781503280786', availableCopies: 2 },
		{ title: 'War and Peace', author: 'Leo Tolstoy', ISBN: '9781400079988', availableCopies: 3 },
		{ title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', ISBN: '9780140449136', availableCopies: 4 },
		{ title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', ISBN: '9780374528379', availableCopies: 3 },
		{ title: 'Brave New World', author: 'Aldous Huxley', ISBN: '9780060850524', availableCopies: 5 },
		{ title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', ISBN: '9780544003415', availableCopies: 6 },
		{ title: 'Animal Farm', author: 'George Orwell', ISBN: '9780451526342', availableCopies: 7 },
		{ title: 'Jane Eyre', author: 'Charlotte Brontë', ISBN: '9781503278196', availableCopies: 5 }
	];

const populateBooks = async () => {
    try {
        await Book.deleteMany({});
        await Book.insertMany(books);
        console.log('Books added to the database');
        mongoose.disconnect();
    } catch (err) {
        console.error('Error populating books:', err);
    }
};

populateBooks();
