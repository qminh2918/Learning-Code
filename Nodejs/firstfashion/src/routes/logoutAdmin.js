const express = require('express');
const route = express.Router();
const logoutAdminController = require('../app/controllers/LogoutAdminController')
route.get('/', logoutAdminController.index);
module.exports = route;
