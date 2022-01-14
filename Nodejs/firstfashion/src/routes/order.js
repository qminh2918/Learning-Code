const express = require('express');
const route= express.Router();
const orderController =require('../app/controllers/OrderController');
const authMiddleware = require('../app/middleware/authMiddleware')
route.post('/:id/orderHandle',authMiddleware,orderController.orderHandle);
route.get('/:id/getOrder', authMiddleware ,orderController.getOrder)
route.post('/postOrder',orderController.postAddOrder )
route.get('/searchOrder', orderController.searchOrder)
route.get('/addOrder',orderController.addOrder);
route.get('/',orderController.index)
module.exports = route;