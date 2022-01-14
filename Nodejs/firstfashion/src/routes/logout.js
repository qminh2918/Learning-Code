const express = require('express');
const route= express.Router();

const logoutController = require('../app/controllers/LogoutController');

route.get('/', logoutController.index );

module.exports = route;