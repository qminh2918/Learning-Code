const Product = require('../../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class AdminController {
    //Get login 
    index(req, res,next) {
        res.render('admin',{layout:'main1.hbs'});
        //next()
    }
}

module.exports = new AdminController;
