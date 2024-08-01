document.addEventListener('DOMContentLoaded', (event) => {
	fetchBooks();
});

function fetchBooks() {
	fetch('http://localhost:3000/api/books')
		.then(response => response.json())
		.then(data => {
			const booksList = document.getElementById('books-list');
			booksList.innerHTML = '';
			data.forEach(book => {
				const bookItem = document.createElement('div');
				bookItem.classList.add('book-item');
				bookItem.innerHTML = `
			<h3>${book.title}</h3>
			<p>Author: ${book.author}</p>
			<p>ISBN: ${book.ISBN}</p>
			<p class="card-text">Available Copies: ${book.availableCopies}</p>
			<button class="btn btn-warning" onclick="showEditBookForm('${book._id}')">Edit</button>
			<button class="btn btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
		  `;
				booksList.appendChild(bookItem);
			});
		});
}

function showAddBookForm() {
	document.getElementById('add-book-form').style.display = 'block';
}

function hideAddBookForm() {
	document.getElementById('add-book-form').style.display = 'none';
}

function addBook() {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;

	fetch('http://localhost:3000/api/books', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title, author, ISBN: isbn })
	})
		.then(response => response.json())
		.then(data => {
			fetchBooks();
			hideAddBookForm();
		});
}

function showEditBookForm(bookID) {
	const title = prompt("Enter new title:");
	const author = prompt("Enter new author:");
	const isbn = prompt("Enter new ISBN:");

	if (title && author && isbn) {
		fetch(`http://localhost:3000/api/books/${bookID}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, author, ISBN: isbn })
		})
			.then(response => response.json())
			.then(data => {
				fetchBooks();
			});
	}
}

function deleteBook(bookID) {
	fetch(`http://localhost:3000/api/books/${bookID}`, {
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(data => {
			fetchBooks();
		})
		.catch(err => {
			console.error('Error deleting book:', err);  // Add logging
		});
}

function borrowBook() {
	const bookTitle = document.getElementById('book-name').value.trim();
	const isbn = document.getElementById('isbn').value.trim();

	fetch('http://localhost:3000/api/transactions/borrow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title: bookTitle, ISBN: isbn })
	})
		.then(response => {
			if (!response.ok) {
				return response.json().then(err => { throw err; });
			}
			return response.json();
		})
		.then(data => {
			alert('Book borrowed successfully');
		})
		.catch(err => {
			console.error('Error borrowing book:', err);
			alert('Failed to borrow the book. Please try again.');
		});
}

function returnBook() {
	const bookTitle = document.getElementById('book-name').value.trim();
	const isbn = document.getElementById('isbn').value.trim();

	fetch('http://localhost:3000/api/transactions/return', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title: bookTitle, ISBN: isbn })
	})
		.then(response => {
			if (!response.ok) {
				return response.json().then(err => { throw err; });
			}
			return response.json();
		})
		.then(data => {
			alert('Book returned successfully');
		})
		.catch(err => {
			console.error('Error returning book:', err);
			alert('Failed to return the book. Please try again.');
		});
}


document.addEventListener('DOMContentLoaded', (event) => {
	fetchBooks();
	fetchBorrowedBooks();
	const themeToggle = document.getElementById('theme-toggle');
	const body = document.body;

	// Check if a theme is saved in localStorage
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		body.className = savedTheme;
		if (savedTheme === 'dark-theme') {
			themeToggle.textContent = 'Switch to Light Mode';
		}
	}

	themeToggle.addEventListener('click', () => {
		if (body.classList.contains('light-theme')) {
			body.classList.replace('light-theme', 'dark-theme');
			themeToggle.textContent = 'Switch to Light Mode';
			localStorage.setItem('theme', 'dark-theme');
		} else {
			body.classList.replace('dark-theme', 'light-theme');
			themeToggle.textContent = 'Switch to Dark Mode';
			localStorage.setItem('theme', 'light-theme');
		}
	});
});

function fetchBorrowedBooks() {
    fetch('http://localhost:3000/api/transactions/borrowed')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to see what is being returned
            if (Array.isArray(data)) {
                const borrowedList = document.getElementById('borrowed-list');
                borrowedList.innerHTML = ''; // Clear previous entries
                data.forEach(transaction => {
                    const bookItem = document.createElement('div');
                    bookItem.classList.add('borrowed-item');
                    bookItem.innerHTML = `
                        <p><strong>${transaction.bookTitle}</strong> (ISBN: ${transaction.bookISBN}) - Borrowed on ${new Date(transaction.borrowDate).toLocaleDateString()}</p>
                    `;
                    borrowedList.appendChild(bookItem);
                });
            } else {
                console.error('Expected an array but got:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching borrowed books:', error);
        });
}


function fetchBooks() {
	fetch('http://localhost:3000/api/books')
		.then(response => response.json())
		.then(data => {
			const booksList = document.getElementById('books-list');
			booksList.innerHTML = '';
			data.forEach(book => {
				const bookItem = document.createElement('div');
				bookItem.classList.add('col-md-4', 'mb-3');
				bookItem.innerHTML = `
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h3 class="card-title">${book.title}</h3>
                            <p class="card-text">Author: ${book.author}</p>
                            <p class="card-text">ISBN: ${book.ISBN}</p>
                            <button class="btn btn-warning btn-sm mr-2" onclick="showEditBookForm('${book._id}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteBook('${book._id}')">Delete</button>
                        </div>
                    </div>
                `;
				booksList.appendChild(bookItem);
			});
		});
}

