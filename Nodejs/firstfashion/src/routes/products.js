const express = require('express');
const route = express.Router();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/products'))
    },
    filename: function (req, file, cb) {
      cb(null, + Date.now() + '-'+file.originalname  )
    }
  })
//const upload = multer({ dest: path.join(__dirname, '../public/img/products')})
const upload = multer({storage : storage})
const authMiddleware = require('../app/middleware/authMiddleware')
const productsController = require('../app/controllers/ProductsController');
route.get('/createProduct', authMiddleware, productsController.createProduct)
route.post('/storeProduct', authMiddleware,
    upload.single('image'),
    productsController.storeProduct)
route.get('/:id/editProduct', authMiddleware,
     upload.single('image'),
    productsController.editProduct)
route.post('/:id/updateProduct', authMiddleware,
     upload.single('image'),
    productsController.updateProduct)
route.post('/:id/deleteProduct', authMiddleware, upload.single('image'), productsController.deleteProduct)
route.get('/trashProduct', authMiddleware, productsController.trashProduct)
route.post('/:id/destroyProduct', authMiddleware, upload.single('image'), productsController.destroyProduct)
route.get('/:id/restoreProduct', authMiddleware, upload.single('image'), productsController.restoreProduct)
route.get('/searchProduct', authMiddleware, upload.single('image'), productsController.searchProduct);
route.get('/colections/:nameProduct',productsController.colectionsProduct)
route.get('/newArrival',productsController.newArrival)
route.get('/sale', productsController.sale)
route.get('/bonusProduct',productsController.bonusProduct)
route.post('/:id/postComment',productsController.postComment)
route.get('/:id/detailProduct',productsController.detailProduct)
route.post('/:id/addToCart',productsController.addToCart)
route.get('/', productsController.index);
module.exports = route;