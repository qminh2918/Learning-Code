const User = require('../models/User');
const bcrypt = require('bcrypt');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../../util/mongoose');
class LoginController {
    //Get login 
    index(req, res) {
        Promise.all([
            Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
            Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
            Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})
        ])
        .then(([categories,colections,sales])=>
            res.render('login',
            {
            layout:'main1.hbs',
            categories:multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
        }
        ))         
    }

}
module.exports = new LoginController;



