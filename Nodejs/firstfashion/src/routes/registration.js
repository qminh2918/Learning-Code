const express = require('express');
const route= express.Router();
const userValidation = require('../app/validator/userValidation');
const transValidation = require('../../lang/vi');

const registrationController = require('../app/controllers/RegistrationController');
route.post('/',userValidation.register, registrationController.postRegistration);
route.get('/', registrationController.index);


module.exports = route;


