const express = require('express');
const route = express.Router()
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/personnel'))
    },
    filename: function (req, file, cb) {
      cb(null, + Date.now() + '-'+file.originalname  )
    }
  })
  const upload = multer({storage : storage})
const authMiddleware = require('../app/middleware/authMiddleware')

const personnelController = require('../app/controllers/PersonnelController')
route.get('/searchPersonnel',upload.single('image'),personnelController.searchPersonnel)
route.get('/createPersonnel', personnelController.createPersonnel)
route.get('/:id/editPersonnel',upload.single('image'), personnelController.editPersonnel)
route.post('/:id/updatePersonnel',upload.single('image'), personnelController.updatePersonnel)
route.post('/storePersonnel',upload.single('image'), personnelController.storePersonnel)
route.post('/:id/deletePersonnel', upload.single('image'),personnelController.deletePersonnel)
route.get('/trashPersonnel', personnelController.trashPersonnel)
route.post('/:id/destroyPersonnel',upload.single('image'), personnelController.destroyPersonnel)
route.get('/:id/restorePersonnel',upload.single('image'), personnelController.restorePersonnel)
route.get('/:id/detailPersonnel',personnelController.detailPersonnel)
route.get('/', personnelController.index)
module.exports = route