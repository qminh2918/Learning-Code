const express = require('express');
const route= express.Router();
const passport = require('passport');
const initPassportLocal = require('../app/controllers/passportController/local');

const loginController = require('../app/controllers/LoginController');

initPassportLocal();

route.get('/', loginController.index);
route.post('/', passport.authenticate("local", {
    successRedirect: '/', // Thành công chuyển hướng về trang chủ 
    failureRedirect: '/login', // Ở lại trang đăng nhập nếu có lỗi
    failureFlash: true ,// Nếu có lỗi thì flash message error
    successFlash: true
}));


module.exports = route;
