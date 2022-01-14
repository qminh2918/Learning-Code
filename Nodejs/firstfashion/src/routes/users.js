const express = require('express');
const route = express.Router();
const usersController = require('../app/controllers/UsersController')
route.get('/searchUser',usersController.searchUser)
route.get('/',usersController.index)
module.exports = route;