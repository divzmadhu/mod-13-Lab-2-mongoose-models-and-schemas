import mongoose from "mongoose";

//Create a Book Schema
const bookSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    author:{
        type : String,
        required : true
    },
    isbn : {
        type : String,
        unique : true
    },
    publishedDate : Date,
    inStock : {
        type : Boolean,
        default : true
    }
});

//Create a Book Model using the Book Schema
const Book = mongoose.model("Book",bookSchema);

//Export the Book Model
export default Book;
