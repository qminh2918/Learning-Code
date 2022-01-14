
const express = require('express');
const route = express.Router();
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/colections'))
    },
    filename: function (req, file, cb) {
      cb(null, + Date.now() + '-'+file.originalname)
    }
  })
const upload = multer({storage : storage})
const authMiddleware = require('../app/middleware/authMiddleware')

const colectionsController = require('../app/controllers/ColectionsController');
route.get('/createColection', authMiddleware,colectionsController.createColection)
route.get('/showColection', colectionsController.showColection)
route.get('/searchColection',colectionsController.searchColection)
route.post('/storeColection', authMiddleware,
    upload.single('imageColection'),
    colectionsController.storeColection)
route.get('/:id/editColection', authMiddleware,
     upload.single('imageColection'),
     colectionsController.editColection)
route.post('/:id/updateColection', authMiddleware,
     upload.single('imageColection'),
     colectionsController.updateColection)
route.post('/:id/deleteColection', authMiddleware, upload.single('imageColection'), colectionsController.deleteColection)
route.get('/trashColection', authMiddleware, colectionsController.trashColection)
route.post('/:id/destroyColection', authMiddleware, upload.single('imageColection'), colectionsController.destroyColection)
route.get('/:id/restoreColection', authMiddleware, upload.single('imageColection'), colectionsController.restoreColection)
route.get('/', colectionsController.index);
module.exports = route;