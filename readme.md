# 📚 Library Management System

## Overview

The Library Management System is a full-stack web application designed to streamline the management of library books and transactions. Built using Node.js, Express, MongoDB, and Bootstrap, the system allows users to perform CRUD operations on books and handle borrowing and returning of books efficiently.

<img width="1639" alt="Screenshot 2024-08-01 at 3 42 41 PM" src="https://github.com/user-attachments/assets/770498b5-8588-41e2-9002-5a310da01bc5">
<img width="1639" alt="Screenshot 2024-08-01 at 3 42 07 PM" src="https://github.com/user-attachments/assets/5810cc30-8aa4-4909-8749-97aec20f5c63">
<img width="1639" alt="Screenshot 2024-08-01 at 3 41 59 PM" src="https://github.com/user-attachments/assets/1ce48e66-6016-4d10-a566-fe6f652c2b2a">
<img width="1436" alt="Screenshot 2024-08-01 at 3 42 24 PM" src="https://github.com/user-attachments/assets/08b901a3-ea58-4487-9e10-53a15db30f0e">



## Features
<br><br>
<h4>📖 Book Management: Add, edit, delete, and view books in the library.
<br><br>
🔄 Borrow & Return: Borrow and return books with real-time updates on available copies.
<br><br>
🌐 Responsive Design: A clean and modern user interface using Bootstrap.
<br><br>
🌓 Theme Toggler: Switch between light and dark modes for a personalized user experience.
</h4>
  <br>
  
## Table of Contents
<br>
•Installation<br>
•API Endpoints<br>
•Frontend Design<br>
•Code Explanation<br>
•Technologies Used<br>

## Installation

## Prerequisites

Ensure you have the following installed:

<br>

`Node.js` and `npm`
<br>
`MongoDB` Atlas account (or a local MongoDB setup)
<br>
`Git`

# Setup Instructions

Clone the Repository:
```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```
## Install Dependencies:

Install the necessary Node.js packages: `npm install`

Configure Environment Variables:

Create a .env file in the root directory and add your MongoDB URI:

`env`
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library_management?retryWrites=true&w=majority
```
Populate the Database:


Run the populateBooks.js script to populate the database with initial data:

```bash
node routes/populateBooks.js
```
Start the Server:

Start the server with the following command:

```bash
npm start
```
`The server will be running at http://localhost:3000.`

# API Endpoints

## Books API
<h4>
  <ol>
<li>GET /api/books: Retrieve all books in the library.</li>
  <br>
<li>POST /api/books: Add a new book. Requires title, author, and ISBN.</li>
  <br>
<li>GET /api/books/
: Retrieve a book by its ID.</li>
  <br>
<li>PUT /api/books/
: Update a book's details by ID. Requires title, author, and ISBN.</li>
  <br>
<li>DELETE /api/books/
: Delete a book by its ID.</li>
  </ol>
</h4>

## Transactions API
<h4>
  <ol><br>
<li>POST /api/transactions/borrow: Borrow a book. Requires title and ISBN.</li><br>
<li>POST /api/transactions/return: Return a book. Requires title and ISBN.</li><br>
<li>GET /api/transactions/borrowed: Retrieve a list of currently borrowed books.</li><br>
  </ol>
</h4>

## Frontend Design
<h4>The frontend is crafted using HTML, CSS, and Bootstrap to ensure a responsive and user-friendly interface. Key features include:</h4>
<ol><br>
<li>Books List: Displays all books with title, author, ISBN, and available copies, along with options to edit or delete.</li><br>
<li>Add/Edit Book Form: Allows users to add or modify book details dynamically.</li><br>
<li>Borrow/Return Section: Facilitates borrowing and returning of books, with real-time updates on available copies.</li><br>
<li>Borrowed Books List: Shows a list of currently borrowed books with relevant details.</li><br>
<li>Theme Toggler: Allows switching between light and dark themes, with the preference saved in local storage.</li><br>
</ol>

# Code Explanation

## Backend (Node.js & Express)
Express: The backbone of our server, handling routing and HTTP requests.
Mongoose: Used for schema-based interaction with MongoDB.
## Routes
books.js: Manages CRUD operations for books.
transactions.js: Manages book borrowing and returning operations.
## Database Models
Book Model: Defines the structure for books, including title, author, ISBN, and available copies.
## Transaction Model: Tracks book borrowing and returning transactions, including dates.
Frontend (HTML, CSS & Bootstrap)
## Bootstrap: 
Ensures a responsive layout with minimal custom CSS.
## JavaScript:
Handles dynamic content updates, form submissions, and interaction with the backend via the fetch API.
Real-time updates on available copies and borrowed books using event listeners and the fetch API.
Theme toggling with state saved in local storage.
## Technologies Used
Node.js: Backend runtime environment.
Express: Web application framework for Node.js.
MongoDB: NoSQL database for storing book and transaction data.
Mongoose: ODM for MongoDB, simplifying database operations.
Bootstrap: CSS framework for responsive design.
JavaScript: For dynamic frontend interactions.
## Frontend Design
The frontend is designed with a simple and clean interface using Bootstrap. It allows users to interact with the backend through a responsive UI that includes forms for adding and editing books, buttons for borrowing and returning books, and real-time updates on the availability of books.


