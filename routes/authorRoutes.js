const express = require('express');
const authorRoutes = express.Router();
const authorControllers = require('../controllers/authorControllers');

authorRoutes.get('/',authorControllers.authorPage);
authorRoutes.get('/new',authorControllers.newAuthorPage);
authorRoutes.post('/new',authorControllers.addTheAuthor);

authorRoutes.get('/:id',authorControllers.showAuthor);
authorRoutes.get('/:id/edit',authorControllers.editAuthor);
authorRoutes.put('/:id/edit',authorControllers.updateAuthor);
authorRoutes.delete('/:id',authorControllers.deleteAuthor);

module.exports = authorRoutes;  