const express = require('express')
const route = express.Router()
const { check, validationResult } = require('express-validator');
const loginAdminController = require('../app/controllers/LoginAdminController')
//const redirectIfAuthenticatedMiddleware = require('../app/middleware/redirectIfAuthenticatedMiddleware')
route.post('/',loginAdminController.getAdmin);
route.get('/',loginAdminController.index);

module.exports = route;
