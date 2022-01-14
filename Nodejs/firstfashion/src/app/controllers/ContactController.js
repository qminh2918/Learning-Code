const Product = require('../models/Product')
const Category = require('../models/Category')
const Supplier = require('../models/Supplier')
const { multipleMongooseToObject } = require('../../util/mongoose')
class ContactController{
index(req,res,next){
Promise.all([
    
    Category.find({ nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
    Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
    Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }}),
    Supplier.find({})
])
.then(([categories,colections,sales,suppliers])=> res.render('contact',{
    layout:'main1.hbs',
    categories: multipleMongooseToObject(categories),
    colections: multipleMongooseToObject(colections),
    sales: multipleMongooseToObject(sales),
    suppliers: multipleMongooseToObject(suppliers),
}))
.catch(next)
}
}
module.exports = new ContactController();