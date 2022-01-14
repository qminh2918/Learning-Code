const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const { check } = require('express-validator')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');

class LoginAdminController {
    index(req, res) {
        res.render('loginAdmin');
    }
    getAdmin(req, res, next) {
        // truy vấn

        Admin.findOne({ email: req.body.email }, (error, admin) => {
            // var errors = basevalidate.checkvalidate(req, admin);
            if (admin) {
                bcrypt.compare(req.body.password, admin.password, (error, same) => {
                    if (same) {
                        //session                    
                        req.session.adminEmail = admin.email;
                        res.redirect('/./manage')
                    } else {

                        res.render('loginAdmin', {
                            data: { error: 'Mật khẩu không đúng' },
                            admin: req.body
                        })
                    }
                })
            } else {
                res.render('loginAdmin', {
                    data: { error: 'Email không đúng' }
                })
            }
        })
    }
}
module.exports = new LoginAdminController;