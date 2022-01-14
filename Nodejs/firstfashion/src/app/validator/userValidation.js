
const { check, validationResult } = require('express-validator');
const transValidation = require('../../../lang/vi');

var register = [
    check('email',transValidation.email_incorrect)
        .isEmail()
        .trim(),
    check('pass', transValidation.password_incorrect)
        .isLength({min: 6})
        .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,}$/),
    check('repass', transValidation.re_password_incorrect)
        .custom((value, {req}) =>{
            return value === req.body.pass
        })
];

module.exports = {register: register};


