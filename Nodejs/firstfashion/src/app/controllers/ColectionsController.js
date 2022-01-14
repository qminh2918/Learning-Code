const Colection = require('../models/Colection');
const Category = require('../models/Category');
const path = require('path')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class ColectionController{
    index(req,res,next){
        Promise.all([Colection.find({}),Colection.countDocumentsDeleted()])
       .then(([colections,deleteCount]) =>
           res.render('colections',{
               deleteCount,
               colections:multipleMongooseToObject(colections)                       
       }))
       .catch(next);
   } 
   showColection(req, res, next){
    Promise.all([
        Colection.find({}),
        Category.find({ nameCategory: { $regex: '.*' + 'Hàng mới' + '.*' }}),
        Category.find({ nameCategory: { $regex: '.*' + 'Bộ sưu tập' + '.*'}}), 
        Category.find({ nameCategory: { $regex: '.*' + 'Sale' + '.*' }}),
    ])
       .then(([getColections,categories,colections,sales])=> res.render('colections/showColection',{
        layout:'main1.hbs',
        getColections: multipleMongooseToObject(getColections),  
        categories: multipleMongooseToObject(categories),
        colections: multipleMongooseToObject(colections),
        sales: multipleMongooseToObject(sales),  
    }))
       .catch(next);
   }
   //search product
   searchColection(req,res,next){
        const nameColection = req.query.q
        const regex = new RegExp(nameColection,'i')
        Promise.all([Colection.find({ nameColection:regex }),Colection.countDocumentsDeleted()])
        .then(([colections,deleteCount]) =>res.render('colections/searchColection',{
            deleteCount,
            colections:multipleMongooseToObject(colections)
        }))
        .catch(next);
   }
   //create product
   createColection(req,res,next){
       if(req.session.adminEmail){
           console.log(req.session.adminEmail)
           res.render('colections/createColection')
       }
       else{

           res.redirect('/loginAdmin')
       }
   }
   storeColection(req,res,next){
       
    req.body.imageColection = req.file.path.split('\\').slice(4).join('\\');       
        const colection = new Colection(req.body)
        colection.save()
        .then(()=>res.redirect('/colections'))
        .catch(next);
   }
   //edit product
   editColection(req,res,next){
   //  req.query.image = req.file.path.split('\\').slice(4).join('\\');
        Colection.findById(req.params.id)
        .then((colection) => res.render('colections/editColection',{
          colection :mongooseToObject(colection)
       }))
       .catch(next)
   }
   updateColection(req,res,next){
       if(req.file){
           req.body.imageColection = req.file.path.split('\\').slice(4).join('\\');
       }else{
           console.log('no')
       }
       Colection.updateOne({ _id: req.params.id },req.body)
       .then(()=> res.redirect('/colections'))
       .catch(next);
   }
   //soft delete product
   // sd pluggin -> mongoose-delete--soft
   deleteColection(req,res,next){
       Colection.delete({ _id: req.params.id})
       .then(()=> res.redirect('/colections'))
       .catch(next);
   }
   trashColection(req,res,next){
    Colection.findDeleted({})
    .then(colections =>res.render('colections/trashColection',{
        colections:multipleMongooseToObject(colections)
    }))
    .catch(next);
   }
   //delete Product
   destroyColection(req,res,next){
       Colection.deleteOne({_id:req.params.id})
       .then(()  =>res.redirect('back'))
       .catch(next)
   }
   // restore product
   restoreColection(req,res,next){
    Colection.restore({ _id: req.params.id})
    .then(() => res.redirect('/colections'))
    .catch(next)
   }

}
module.exports = new ColectionController;