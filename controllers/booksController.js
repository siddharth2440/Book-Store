const author = require('../models/author');
const book = require('../models/books');
const mongoose = require('mongoose');
const booksHome = async (req,res)=>{
    const authors = await author.find({})
    const books = await book.find({})
    res.render('books/home',{authors,books});
}

const newBook = async (req,res)=>{
    const authors = await author.find({})
    const books = await book.find({})
    res.render('books/book',{authors,books})
}


const addNewBook = async (req,res)=>{
    try {
        const newBook = new book({
            title: req.body.title,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            coverImageName: req.file.filename,
            description: req.body.description
        })
        const bookSaveToDb = await newBook.save();
        const books = await book.find({})
        if(bookSaveToDb){
            res.render('books/home',{
                Message : "User Saved Successfully",
                books
            })
        }
        else{
            res.redirect('/books/newBook')
        }
    } catch (error) {
        console.log(error.message);
        console.log(error.name);
    }
}


const showOneBook = async (req,res) =>{
    const BookID = req.params.id;
    const totalBooks = await book.find({}).count();
    // console.log(totalBooks);
    const findThatBook = await book.find({_id:BookID});
    const bookAllDetails = await book.aggregate([{$lookup:{from:'authors',localField:'author',foreignField:'_id',as:'Book'}}]);
    const BookFoundByTheId = bookAllDetails.find(element=>element._id==req.params.id);
    console.log(BookFoundByTheId);
    res.render('books/EachBookRender',{BookFoundByTheId})
}
    // res.send(det);

const showEditPage =async (req,res)=>{
    const id = req.params.id;
    const authors = await author.find({});
    const books = await book.find({_id:id})
    res.render('books/editTheBook',{authors,books});
}

const editThePage =async (req,res)=>{
    const id = req.params.id;
    console.log("id in the edit the page book is "+id);  
    const books = await book.find({_id:new mongoose.Types.ObjectId(id)})
    const bookAuthor = books[0].author;
    console.log(bookAuthor);

    let selectedBook = await book.aggregate([{$match:{_id:new mongoose.Types.ObjectId(req.params.id)}},{$lookup:{from:'authors',localField:'author',foreignField:'_id',as:'asFuck'}}]);
    // const bookPopulate = await book.findById(req.params.id)
    // .populate('author')
    // .exec()
    // console.log(bookPopulate);


    const Book  = await book.findById(req.params.id);
    const updateBook = await book.updateOne({_id:req.params.id},{
        $set:{
            title:req.body.title,
            description:req.body.description,
            pageCount:req.body.pageCount,
            publishDate:req.body.publishDate
        }
    })

    // const updateBookAuthorId = await author.aggregate([{$match:{_id:bookAuthor}}]);
    // const findAndThenUpdate =await author.updateOne({_id:bookAuthor},{$set:{name:req.body.author}});

    if(updateBook){
        console.log("Bok updated");
    }else{
        console.log("Not Updated");
    }

    // console.log(updateTheBook);
    res.send(selectedBook);
}

const deleteBook =async (req,res)=>{
    const id = req.params.id;
    const deleteTheBook = await book.aggregate([{$match:{_id:new mongoose.Types.ObjectId(req.params.id)}}]);
    const finalDelete = await book.deleteOne({_id:req.params.id})
    if(finalDelete){
        console.log('Book is Deleted');
        res.redirect('/books')
    }else{
        console.log("Book isn't deleted");
    }
}

module.exports = {
    booksHome,
    newBook,
    addNewBook,
    showOneBook,
    showEditPage,
    editThePage,
    deleteBook
}