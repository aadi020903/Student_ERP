const Book = require('../models/book_model');


const mongoose = require('mongoose');
exports.countbook = async (req,res)=>{
    const book_count= await Book.find().count();
    
     NewprimaryKey=2200+book_count+1;
     
     return {
        NewprimaryKey:NewprimaryKey,
        book_count:book_count
    };
           
    }
exports.bookRegistration = async (req, res) => {
    
    try {

        let existingBook = await Book.findOne({booktitle:req.body.booktitle }|| {ISBN : req.body.ISBN }|| {primarykey: req.body.primarykey });
        if(existingBook){
            return {
                success: false,
                message: "Book already exists",
                book_Data: existingBook,
            }
        }
       
        let bookData = new Book({
            primarykey: req.body.primarykey,
            booktitle: req.body.booktitle,
            authorname: req.body.authorname,
            ISBN: req.body.ISBN,
            genre:req.body.genre,
            publishedyear:req.body.publishedyear,
            totalcopies: req.body.totalcopies,
            availablecopies: req.body.availablecopies
        });

        // Save the new book data to the database
        let book_Data = await bookData.save();

        if (book_Data) {
          
            
          return {
            book_Data,
            success:true,
            message:"Book Added Successfully"
          }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error in registration' });
    }
}