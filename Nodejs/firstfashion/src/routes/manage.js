const express = require('express')
const route = express.Router();
const manageController = require('../app/controllers/ManageController')
route.get('/', manageController.index)
module.exports = route;