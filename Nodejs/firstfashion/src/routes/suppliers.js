const express = require('express');
const route = express.Router();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/suppliers'))
    },
    filename: function (req, file, cb) {
      cb(null, + Date.now() + '-'+file.originalname)
    }
  })
const upload = multer({storage : storage})
const authMiddleware = require('../app/middleware/authMiddleware')
const suppliersController = require('../app/controllers/SuppliersController')
route.post('/:id/destroySupplier',authMiddleware,
    suppliersController.destroySupplier)
route.get('/trashSupplier',authMiddleware,
    suppliersController.trashSupplier)
route.post('/:id/deleteSupplier',suppliersController.deleteSupplier)
route.get('/:id/restoreSupplier',suppliersController.restoreSupplier)
route.post('/:id/updateSupplier',
    upload.single('imageSupplier'),
    suppliersController.updateSupplier)
route.get('/:id/editSupplier',
    authMiddleware,
    upload.single('imageSupplier'),
    suppliersController.editSupplier)
route.post('/storeSupplier', 
    upload.single('imageSupplier'),
    suppliersController.storeSupplier)
route.get('/createSupplier',
    authMiddleware,
    suppliersController.createSupplier)
route.get('/searchSupplier',suppliersController.searchSupplier)
route.get('/',suppliersController.index)
module.exports = route;
