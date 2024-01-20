const Author = require('../models/author');
const Book = require('../models/books');
const home = async (req,res)=>{
    const locals = {
        title:"Books"
    }
    const books = await Book.find({});
    const authors = await Author.find({});
    const combinedDetailsOfAuthors= await Book.aggregate([{$lookup:{from:"authors",localField:'author',foreignField:'_id',as:'as'}}])
    // console.log(combinedDetailsOfAuthors); //_id
    res.render('index',{locals,books,authors,combinedDetailsOfAuthors});
    // res.send(combinedDetailsOfAuthors);
}


module.exports = {
    home
}