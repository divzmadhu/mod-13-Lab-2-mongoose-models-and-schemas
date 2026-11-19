// 1. Import Express to access its Router functionality
import express from "express";

// 2. Import the Book model to interact with the books collection
import Book from "../models/Book.js";

// 3. Create a separate router instance to manage book-related routes
const router = express.Router();



// 4 CREATE: Add a new book to the database
router.post("/", async (req, res) => {
    try {

        // 4.1 Get the book details sent by the client
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);

    } catch (error) {
        // 4.2 Handle errors while adding a book
        res.status(400).json({ message: error.message });
    }
});

// 5 READ: Retrieve all books from the database
router.get("/", async (req, res) => {
    try {

        // 5.1 Retrieve all book documents from MongoDB
        const books = await Book.find();

        //Send the retrieved books to the client
        res.status(200).json(books);

    } catch (error) {
        // 5.2 Handle errors while retrieving books
        res.status(500).json({ message: error.message });
    }
})

//6. READ One: Router function GET a single book by ID
router.get("/:id", async (req, res) => {
    try {

        // 6.1 Retrieve the book with given id
        const book = await Book.findById(req.params.id);

        // 6.2 Check whether the book exists
        if (!book) {
            return res.status(404).json({ message: "Book NOT found!" });
        }

        // 6.3 Send the retrieved book to the client
        res.status(200).json(book);

    } catch (error) {
        //6.4 Handle error while retrieving the book
        res.status(500).json({ message: error.message });
    }

})

// 7. UPDATE: Updates a book by its _id using the data in req.body.

router.put("/:id", async (req, res) => {
    try {

        // 7.1 Update an existing book whose id is given
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // 7.2 Check whether the book esixts
        if(!updatedBook){
            return res.status(404).json({message : "Book NOT found!"});
        }

        // 7.3 Send the updated book to the client
        res.status(200).json(updatedBook);

    } catch (error) {
        // 7.4 Handle errors while updating the book
        res.status(500).json({ message: error.message });

    }

});

// 8. DELETE: Deletes a book by its _id
router.delete("/:id", async(req, res) => {
    try{

        //8.1 Find the book by ID and delete it
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        //8.2  Check whether the book exists
        if(!deletedBook){
            return res.status(404).json({message: "Book NOT found!"});            
        }
        
        //8.3 Send a success response to the client
        res.status(200).json({
            message : "Book deleted successfully!",
            deletedBook: deletedBook
        });        

    }catch(error) {

        //8.4 Handle errors while deleting the book
        res.status(500).json({message: error.message});

    }
})

//9. Export the router so it can be used in index.js
export default router;