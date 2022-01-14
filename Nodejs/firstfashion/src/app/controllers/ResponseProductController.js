const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class ResponseProductController{
    index(req, res, next){
    Product.find({})
    .then((products) =>
    res.render('responseProduct',{
       products: multipleMongooseToObject(products)    
    }
    // res.json(products)
    ))
    .catch(next)
    }
    commentHandle(req,res,next){
    Product.updateOne({ 'comment._id':req.params.id},{$set:{"comment.$.status":1}})
    .then(()=>{
    res.redirect('back')
   
    .catch(next)
   })
    }
}
module.exports = new ResponseProductController()