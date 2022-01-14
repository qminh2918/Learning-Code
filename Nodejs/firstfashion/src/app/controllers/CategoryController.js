const Category = require('../models/Category');
const path = require('path')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class CategoryController{
    index(req,res,next){
        Promise.all([Category.find({}),Category.countDocumentsDeleted()])
       .then(([categories,deleteCount]) =>
           res.render('category',{
               deleteCount,
               categories:multipleMongooseToObject(categories)                       
       }))
       .catch(next);
   } 
   //search product
   searchCategory(req,res,next){
        const nameCategory = req.query.q
        const regex = new RegExp(nameCategory,'i')
        Promise.all([Category.find({ nameCategory:regex }),Category.countDocumentsDeleted()])
        .then(([categories,deleteCount]) =>res.render('category/searchCategory',{
            deleteCount,
            categories:multipleMongooseToObject(categories)
        }))
        .catch(next);
   }
   //create product
   createCategory(req,res,next){
       if(req.session.adminEmail){
           console.log(req.session.adminEmail)
           res.render('category/createCategory')
       }
       else{

           res.redirect('/loginAdmin')
       }
   }
   storeCategory(req,res,next){
       
    req.body.imageCategory = req.file.path.split('\\').slice(4).join('\\');       
        const category = new Category(req.body)
        category.save()
        .then(()=>res.redirect('/category'))
        .catch(next);
   }
   //edit product
   editCategory(req,res,next){
   //  req.query.image = req.file.path.split('\\').slice(4).join('\\');
        Category.findById(req.params.id)
        .then((category) => res.render('category/editCategory',{
          category :mongooseToObject(category)
       }))
       .catch(next)
   }
   updateCategory(req,res,next){
       if(req.file){
           req.body.imageCategory = req.file.path.split('\\').slice(4).join('\\');
       }else{
           console.log('no')
       }
       Category.updateOne({ _id: req.params.id },req.body)
       .then(()=> res.redirect('/category'))
       .catch(next);
   }
   //soft delete product
   // sd pluggin -> mongoose-delete--soft
   deleteCategory(req,res,next){
       Category.delete({ _id: req.params.id})
       .then(()=> res.redirect('/category'))
       .catch(next);
   }
   trashCategory(req,res,next){
    Category.findDeleted({})
    .then(categories =>res.render('category/trashCategory',{
        categories:multipleMongooseToObject(categories)
    }))
    .catch(next);
   }
   //delete Product
   destroyCategory(req,res,next){
       Category.deleteOne({_id:req.params.id})
       .then(()  =>res.redirect('back'))
       .catch(next)
   }
   // restore product
   restoreCategory(req,res,next){
    Category.restore({ _id: req.params.id})
    .then(() => res.redirect('/category'))
    .catch(next)
   }

}
module.exports = new CategoryController;