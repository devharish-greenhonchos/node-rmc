const express = require('express');
const Route = express.Router();
const AuthController = require('../app/controllers/AuthController')
const authenticateUser = require('../app/middlewares/auth')

Route.post('/login', AuthController.login);
Route.post('/register', AuthController.register);
Route.get('/logout', authenticateUser, AuthController.logout);

module.exports = Route;