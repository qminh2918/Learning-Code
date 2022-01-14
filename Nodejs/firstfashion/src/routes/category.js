
const express = require('express');
const route = express.Router();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/category'))
    },
    filename: function (req, file, cb) {
      cb(null, + Date.now() + '-'+file.originalname)
    }
  })
const upload = multer({storage : storage})
const authMiddleware = require('../app/middleware/authMiddleware')

const categoryController = require('../app/controllers/CategoryController');
route.get('/createCategory', authMiddleware,categoryController.createCategory)
route.get('/searchCategory', authMiddleware,categoryController.searchCategory)
route.post('/storeCategory', authMiddleware,
    upload.single('imageCategory'),
    categoryController.storeCategory)
route.get('/:id/editCategory', authMiddleware,
     upload.single('imageCategory'),
     categoryController.editCategory)
route.post('/:id/updateCategory', authMiddleware,
     upload.single('imageCategory'),
     categoryController.updateCategory)
route.post('/:id/deleteCategory', authMiddleware, upload.single('imageCategory'), categoryController.deleteCategory)
route.get('/trashCategory', authMiddleware, categoryController.trashCategory)
route.post('/:id/destroyCategory', authMiddleware, upload.single('imageCategory'), categoryController.destroyCategory)
route.get('/:id/restoreCategory', authMiddleware, upload.single('imageCategory'), categoryController.restoreCategory)
route.get('/', categoryController.index);
module.exports = route;