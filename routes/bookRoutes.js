// 1. Import Express to access its Router functionality
import express from "express";

// 2. Import the Book model to interact with the books collection
import Book from "../models/Book.js";

// 3. Create a separate router instance to manage book-related routes
const router = express.Router();



// 4. CREATE: Add a new book to the database
router.post("/", async (req, res) => {
    try {
        // 4.1 Get the book details sent by the client
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);

    } catch (error) {
        // 4.2 Handle errors while adding a book
        res.status(400).json({message:error.message});
    }
});

// 5. READ: Retrieve all books from the database
router.get("/" , async (req,res) => {
    try{
        // 4.2 Retrieve all book documents from MongoDB
        const books = await Book.find();

        //Send the retrieved books to the client
        res.status(200).json(books);

    }catch(error) {
        // Handle errors while retrieving books
        res.status(500).json({message:error.message});
    }
})