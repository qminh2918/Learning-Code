const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class OrderController{
  index(req,res,next){
    var cartProduct
    if (!req.session.cart) {
      cartProduct = null;
    } else {
      var cart = new Cart(req.session.cart);
      cartProduct = cart.generateArray();
    }
    console.log(req.session.cart)
    Order.find({})
    .then((orders)=>{
    res.render('order',{
      orders : multipleMongooseToObject(orders),
       user: req.user,
      cartProduct: cartProduct
    })
      
    })
    .catch(next)
  }
  searchOrder(req, res,next){
    const fullName = req.query.q
    const address = req.query.q
    const nameRegex = new RegExp(fullName,'i')
    const addressRegex = new RegExp(address,'i') 
    Order.find({
      $or:[
        {
        fullName:nameRegex
      },
      {
        address:addressRegex
      }
    ]
    })
    .then((orders)=>res.render('order/searchOrder',{
      orders:multipleMongooseToObject(orders)
    }))
    .catch(next)
  }
  getOrder(req, res,next){
    var cartProduct
    if (!req.session.cart) {
      cartProduct = null;
    } else {
      var cart = new Cart(req.session.cart);
      cartProduct = cart.generateArray();
    }
    Order.findById({_id:req.params.id})
    .then((order)=>{
    res.render('order/getOrder',{
      order: mongooseToObject(order),
      item: order.cart.items,
      user: req.user,
      cartProduct: cartProduct
    })
     console.log(order.cart.items) 
    })
    .catch(next)
  }
  
  addOrder(req, res,next){
    var cartProduct;
    if (!req.session.cart) {
    cartProduct = null;
    } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
      }
      res.render('order/addOrder', {
        layout:'main1.hbs',
        user: req.user,
        cartProduct: cartProduct
    });
    
  }
  postAddOrder= async (req, res, next) => {
   // console.log(req.session.cart)
   if (typeof req.user === "undefined") {
    res.redirect('/login')
   }else{
    if (req.session.cart.totalQty) {
    const order = new Order({
      user: req.session.passport.user,
      cart : req.session.cart,
      fullName:req.body.fullName,
      address: req.body.address,
      phoneNumber:req.body.phoneNumber
    })

    for (var id in req.session.cart.items) {
      await Product.findOne({ _id: id })
        .then(product => {
          product.quantity += parseInt(req.session.cart.items[id].qty);
          product.save();
        })
        .catch(err => console.log(err));
    }

    order.save()
    .then(() => { 
    // req.session.cart= null,
    req.user.cart ={},
    req.user.save(),
    res.redirect('/cart')
  })

  }else{
    res.redirect('/cart')
  }
}

}
  orderHandle(req,res,next){    
      Order.updateOne({_id: req.params.id},{ $set: { status: '1' } })     
    .then(()=>{
      req.session.cart= null
      res.redirect('back')
      })
    .catch(next)
  }
}
module.exports = new OrderController();