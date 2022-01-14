const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class CartController {
  getCart (req, res, next) {
    var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
    Promise.all([
      Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
      Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
      Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})
    ])
    .then(([categories, colections,sales])=>

      res.render('cart',{
          layout:'main1.hbs',
          user: req.user,
          cartProduct: cartProduct,
          categories:multipleMongooseToObject(categories),
          colections: multipleMongooseToObject(colections),
          sales: multipleMongooseToObject(sales),
        }))
  
      .catch(next)
  }
}
  deleteCart(req,res,next) {
    var prodId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart :{items: {}});
    Product.findById(prodId, (err, product) => {
      if (err) {
        return res.redirect("back");
      }
      cart.deleteItem(prodId);
      req.session.cart = cart;
      if (req.user) {
        req.user.cart = cart;
        req.user.save();
      }
      console.log(req.session.cart);
      res.redirect("back");
    });
  }
  postUpdateCart(req, res, next){
    var quantityUpdate = req.body.quantityUpdate;
        var productId = req.body.idUpdate;
        var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

        cart.update(productId, quantityUpdate);
        req.session.cart = cart;
        res.redirect('back')
  }
}

module.exports = new CartController();