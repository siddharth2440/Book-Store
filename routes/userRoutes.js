const express = require('express');
const userRoutes = express.Router();
const userControllers = require('../controllers/userControllers');

userRoutes.get('/',userControllers.home);
// userRoutes.get('/',userControllers);

module.exports = userRoutes;