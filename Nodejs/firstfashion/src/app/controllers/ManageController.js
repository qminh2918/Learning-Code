const Product = require('../models/Product');
const Order = require('../models/Order');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');

class ManageController {
    index(req, res, next) {
        Promise.all([
            Product.aggregate([
                { $group: { _id: null, sum: { $sum: "$quantity" } } }
            ]),
            Order.countDocuments({status:0}).count(function(err,countOrder){
                if(countOrder){
                    return countOrder;
                }
            }),
            Product.find({})
        ])
            .then(([[total],countOrder, products]) =>
                res.render('manage', {
                    total: total,
                    countOrder: countOrder,
                    products:multipleMongooseToObject(products)
                }))
            
            .catch(next);
    }
}
module.exports = new ManageController;