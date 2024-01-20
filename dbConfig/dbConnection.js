const mongoose = require('mongoose');

const dbConnection = () =>{
    mongoose
        .connect('mongodb://localhost:27017/BooksAuthor')
        .then(()=>console.log('DataBase is Connected'))
        .catch((err)=>console.log('DataBase unable to connected beacause of '+err.message))
}


module.exports = dbConnection

// mongodb://localhost:27017/