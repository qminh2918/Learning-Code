const express = require('express');
const route= express.Router();
const cartController =require('../app/controllers/CartController');
route.post('/postUpdateCart',cartController.postUpdateCart)
route.post('/:id/deleteCart',cartController.deleteCart)
route.get('/',cartController.getCart);
module.exports = route;