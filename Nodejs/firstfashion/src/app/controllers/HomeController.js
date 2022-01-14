const Product = require('../models/Product')
const Category = require('../models/Category')
const Supplier = require('../models/Supplier')
const Colection = require('../models/Colection')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class HomeController {
    
    index(req, res, next) {
        Promise.all([
        Product.find({}).limit(6),
        Category.find({ nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
        Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
        Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }}),
        Supplier.find({})
    ])
        .then(([products,categories,colections,sales,suppliers]) =>res.render('home',{
            layout:'main1.hbs',
            products: multipleMongooseToObject(products),
            categories: multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
            suppliers: multipleMongooseToObject(suppliers),
        }))
        .catch(next)
    }
    // index(req, res, next){
    //     Promise.all([ 
            
    //         Category.find({ nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
    //         Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
    //         Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})])
            
    //         .then(([categories,colections,sales]) =>res.render('partials/header1',{
    //            layout:'main1.hbs',
    //             categories: multipleMongooseToObject(categories),
    //             colections: multipleMongooseToObject(colections),
    //             sales: multipleMongooseToObject(sales),
    //         }))
            
    //         .catch(next)
    // }
    search(req, res, next) {
        const search = req.query.q
        const regex = new RegExp(search,'i')
        Promise.all([
            Product.find(
                {   $or:[
                    { nameProduct:regex },
                    { supplier:regex}
                    ]}
                ),
            Category.find({ nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
            Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
            Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }}),
            
        ])
        .then(([products, categories,colections,sales])=>res.render('search',{
            layout:'main1.hbs',
            products: multipleMongooseToObject(products),
            categories: multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
        }))
        //res.render('home/search')
        .catch(next)
    }
    // index(req, res,next){
    //     //const userRegex = new RegExp('Hàng mới', 'i')
    //     Category.find({ nameCategory: { $regex: '.*' + 'mới' + '.*' } })
    //     .then((categories)=>res.redirect('/partials/header1',{
    //         layout:'main1.hbs',
    //         categories: multipleMongooseToObject(categories)
    //     }))
    //     .catch(next)
    // }
}

module.exports = new HomeController;
