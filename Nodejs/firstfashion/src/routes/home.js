const express = require('express');
const route = express.Router();

const homeController = require('../app/controllers/HomeController');

route.get('/search', homeController.search)
//route.get('/', homeController.detailCategory)

route.get('/', homeController.index);
module.exports = route;