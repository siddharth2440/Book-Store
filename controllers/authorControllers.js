const author = require('../models/author');
const book = require('../models/books');
const books = require('../models/books');
const authorPage = async (req,res)=>{
    const authors = await author.find({})
    let searchTerm = req.body.SearchTerm;
    // let searchResults = author.find({name:new RegExp(searchTerm, 'i')})
    res.render('authors/authors',{
        authors});
}

const newAuthorPage = (req,res)=>{
    console.log("Hii hello mr BFG");
    res.render('authors/newAuthor')
}


const addTheAuthor = async (req,res)=>{
    console.log(req.body.authorname);
    const newAuthor = new author({
        name:req.body.authorname
    })

    const saveAuthor = await newAuthor.save();
    const authors = await author.find({});
    if(saveAuthor){
        const Message = "User Saved Successfully"
        console.log("Author is saved to the Database");
        res.render('authors/authors',{Message,authors})
    }else{
        res.redirect('/authors/new');
    }
}
const showAuthor = async (req,res)=>{
    
    const totalAuthors = await author.find({}).count();
    const totalBooks = await books.find({}).count();
    const authorID = req.params.id;
    const authors = await author.find({_id:authorID});
    const book = await books.find({author:authorID});  
    const TotalBookswritten = await books.find({author:authorID}).countDocuments();
    const temp = await books.find({author:authors._id})
    res.render('authors/show',{
        authors,
        book,
        authorID,
        TotalBookswritten
    });
}
//updateAuthor
const editAuthor = async (req,res)=>{
    const authorID = req.params.id;
    console.log("Hii");
    console.log(authorID);

    const alreadySavedAuthor = await author.find({_id:authorID})
    console.log(alreadySavedAuthor);
    res.render('authors/edit',{
        alreadySavedAuthor,
        authorID
    })
}
const updateAuthor = async (req,res)=>{
    const authorID = req.params.id;
    const alreadySavedAuthor = await author.find({_id:authorID})
    console.log(alreadySavedAuthor);
    const newAuthorEdit = req.body.name;
    const updateAuthor = await author.updateOne({_id:authorID},{$set:{name:newAuthorEdit}});
    res.redirect('/')
}
const deleteAuthor = async (req,res)=>{
    const authorID = req.params.id
    const deleteAuthor = await author.deleteOne({_id:authorID})
    const deleteAllTheBooksWrittenByTheSameAuthor = await book.deleteMany({author:authorID});
    res.redirect('/authors')
}
module.exports = {
    authorPage,
    newAuthorPage,
    addTheAuthor,showAuthor,editAuthor,updateAuthor,deleteAuthor
}   