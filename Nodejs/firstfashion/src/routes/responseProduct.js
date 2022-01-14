const express = require('express');
const route= express.Router();
const responseProductController =require('../app/controllers/ResponseProductController');
const authMiddleware = require('../app/middleware/authMiddleware')
route.post('/:id/commentHandle',authMiddleware,responseProductController.commentHandle)
route.get('/',responseProductController.index)
module.exports = route;