const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Cart = require('../models/Cart');
const path = require('path')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class ProductsController{
    // show product và đếm số bản ghi đã xóa 
    // promise.all -> xử lí bất đồng bộ chạy song song
    index(req,res,next){
        Promise.all([Product.find({}),
            Product.countDocumentsDeleted(),
            Order.find({status:1})
            
        ])
       .then(([products,deleteCount, ordered]) =>
           res.render('products',{
               deleteCount,
               ordered: multipleMongooseToObject(ordered) ,                     
               products:multipleMongooseToObject(products) ,
       }))
       .catch(next);
    
        // Product.find({})
        // .then((products)=>{
        //     res.render('products',{
        //         products: multipleMongooseToObject(products),
        //     });
        // })
        // .catch(next);
   } 
   addToCart(req, res,next){
    var prodId = req.params.id;  
    var quantityItem = req.body.quantityItem ;
    console.log(quantityItem)
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    
    Product.findById(prodId)
    .then(product => {
        product = product?product.toObject():product;
        console.log(product)
        cart.add(product, prodId, quantityItem);
        req.session.cart = cart;
        console.log(req.user)
        if (req.user) {
            req.user.cart = cart;
            req.user.save();
          }
        console.log(req.session.cart)
        // res.redirect('/detail/'+productId+'');  // Nếu click nút thêm vào giỏ hàng
 
        res.redirect('/cart'); // Nếu click nút mua ngay.
        })
    .catch(next);
   }
   bonusProduct(req,res,next){
        Promise.all([Product.find({}),
            Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
            Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
            Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }}) 
        ])
       .then(([products,categories,colections,sales])=>res.render('products/bonusProduct',{
           layout:'main1.hbs',
           products: multipleMongooseToObject(products),
           categories:multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
       }))
       .catch(next);
   }
   newArrival(req, res, next){
    const newArrivalRegex = new RegExp('new arrival', 'i')
    Promise.all([
        Product.find({ note:newArrivalRegex}),
        Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
        Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
        Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})
    ])
    .then(([products,categories,colections,sales])=>{
        res.render('products/colectionsProduct',{
            layout:'main1.hbs',
            products:multipleMongooseToObject(products),
            categories:multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
        })
    })
   }
   sale(req, res,next){
       const saleRegex = new RegExp('sale','i')
       Promise.all([
           Product.find({ note:saleRegex}),
           Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
           Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
           Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})

       ])
    .then(([products,categories,colections,sales])=>{
        res.render('products/colectionsProduct',{
            layout:'main1.hbs',
            products:multipleMongooseToObject(products),
            categories:multipleMongooseToObject(categories),
            colections: multipleMongooseToObject(colections),
            sales: multipleMongooseToObject(sales),
        })
    })
   }
   colectionsProduct(req,res,next){ 
    const newArrivalRegex = new RegExp('new arrival', 'i')
    const saleRegex = new RegExp('sale','i')
    const colectionsRegex = new RegExp('colection','i')
    // tên sp trong categories
    const query = req.params.nameProduct;
    // truy vấn trong products
    const nameProductRegex = new RegExp(query, 'i');
    Promise.all([
        Product.find(
            { $or:[
                {
                note:newArrivalRegex,nameProduct: nameProductRegex
                },
                {
                note:saleRegex,nameProduct: nameProductRegex
                },
            ]}
            ),
        Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
        Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
        Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})
    ])
    .then(([products,categories,colections,sales])=> res.render('products/colectionsProduct',{
        layout:'main1.hbs',
        products: multipleMongooseToObject(products),
        categories:multipleMongooseToObject(categories),
        colections: multipleMongooseToObject(colections),
        sales: multipleMongooseToObject(sales),
    }))
    .catch(next)
   }
   detailProduct(req, res, next) {
    Promise.all([Product.findById(req.params.id),
        Category.find({nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
        Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
        Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }})
    ])
    .then(([product,categories,colections,sales])=> res.render('products/detailProduct',{
        layout:'main1.hbs',
        product: mongooseToObject(product),
        categories:multipleMongooseToObject(categories),
        colections: multipleMongooseToObject(colections),
        sales: multipleMongooseToObject(sales),

    }))
    .catch(next)
   }
   postComment(req, res, next){
    var tname;
    if (typeof req.user === "undefined") {
      res.redirect('/login')
    } else {
      tname = req.user.email;
      console.log(tname)
      console.log(req.user.email)
    }
    Product.findOne({_id: req.params.id})
    .then(product => {
        product.comment.push({
        content: req.body.comment,
        user: tname,
        });
        product.save();
      });
      res.redirect("back");
    };
   //search product
   searchProduct(req,res,next){
        const nameProduct = req.query.q
        const regex = new RegExp(nameProduct,'i')
        Promise.all([Product.find({ nameProduct:regex }),Product.countDocumentsDeleted()])
        .then(([products,deleteCount]) =>res.render('products/searchProduct',{
            deleteCount,
            products:multipleMongooseToObject(products)
        }))
        .catch(next);
   }
   //create product
   createProduct(req,res,next){
       if(req.session.adminEmail){
           console.log(req.session.adminEmail)
           res.render('products/createProduct')
       }
       else{

           res.redirect('/loginAdmin')
       }
   }
   storeProduct(req,res,next){
       
    req.body.image = req.file.path.split('\\').slice(4).join('\\');       
        const product = new Product(req.body)
        product.save()
        .then(()=>res.redirect('/products'))
        .catch(next);
   }
   //edit product
   editProduct(req,res,next){
   //  req.query.image = req.file.path.split('\\').slice(4).join('\\');
        Product.findById(req.params.id)
        .then((product) => res.render('products/editProduct',{
          product :mongooseToObject(product)
       }))
       .catch(next)
   }
   updateProduct(req,res,next){
       if(req.file){
           req.body.image = req.file.path.split('\\').slice(4).join('\\');
       }else{
           console.log('no')
       }
       Product.updateOne({ _id: req.params.id },req.body)
       .then(()=> res.redirect('/products'))
       .catch(next);
   }
   //soft delete product
   // sd pluggin -> mongoose-delete--soft
   deleteProduct(req,res,next){
       Product.delete({ _id: req.params.id})
       .then(()=> res.redirect('/products'))
       .catch(next);
   }
   trashProduct(req,res,next){
    Product.findDeleted({})
    .then(products =>res.render('products/trashProduct',{
        products:multipleMongooseToObject(products)
    }))
    .catch(next);
   }
   //delete Product
   destroyProduct(req,res,next){
       Product.deleteOne({_id:req.params.id})
       .then(()  =>res.redirect('back'))
       .catch(next)
   }
   // restore product
   restoreProduct(req,res,next){
    Product.restore({ _id: req.params.id})
    .then(() => res.redirect('/products'))
    .catch(next)
   }

}
module.exports = new ProductsController();
