
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const auth = require('../servers/authServer');
const Category = require('../models/Category');
const { restoreSupplier } = require('./SuppliersController');
const { multipleMongooseToObject } = require('../../util/mongoose')

class RegistrationController {
    //Get login 
    index(req, res) {
        Promise.all([
            Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
            Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
            Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})
        ])
        .then(([categories,colections,sales])=>
            res.render('registration',
            {
            layout:'main1.hbs',
            categories:multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
        }
        ))     
    }
    // registration
    async postRegistration(req, res){
        var errorArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped())
            errors.forEach(item => {
                errorArr.push(item.msg);
            });
            console.log('errors');
            return res.render('registration', {
                layout:'main1.hbs',
                messages:errorArr});
        }try {
            
            await auth.register(req.body.email, req.body.pass); 
            res.redirect('login');
            
        } catch (error) {
            errorArr.push(error)
            return res.render('registration', {
                layout:'main1.hbs',
                messages:errorArr});
        }
    }
}
module.exports = new RegistrationController;
