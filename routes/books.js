const express = require('express');
const BookRoutes = express.Router();
const booksControllers = require('../controllers/booksController');
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(path.join(__dirname,'../public/uploads'));
        cb(null,path.join(__dirname,'../public/uploads'))
    },
    filename:(req,file,cb)=>{
        const name = Date.now()+'-'+file.originalname;
        console.log('Name of Image '+name);
        cb(null,name)
    }
})

const upload = multer({storage:storage})


BookRoutes.get('/',booksControllers.booksHome);
BookRoutes.get('/newBook',booksControllers.newBook);
BookRoutes.post('/newBook',upload.single('coverPage'),booksControllers.addNewBook);
BookRoutes.get('/:id',booksControllers.showOneBook);
BookRoutes.get('/:id/edit',booksControllers.showEditPage);
BookRoutes.put('/:id/edit',booksControllers.editThePage);
BookRoutes.delete('/:id',booksControllers.deleteBook);
module.exports = BookRoutes;