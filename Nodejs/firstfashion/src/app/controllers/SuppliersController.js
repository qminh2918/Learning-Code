const Supplier = require('../models/Supplier');
const path = require('path')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose');
class SuppliersController {
    index(req,res,next) {
       Promise.all([Supplier.find({}),Supplier.countDocumentsDeleted()])
       .then(([suppliers,deleteCount]) =>{
           res.render('suppliers',{
               deleteCount,
               suppliers:multipleMongooseToObject(suppliers)
           })
       })
       .catch(next)
    }
    searchSupplier(req,res,next) {
        const nameSupplier = req.query.q;
        const regex = new RegExp(nameSupplier,'i');
        Promise.all([Supplier.find({ nameSupplier:regex }), Supplier.countDocumentsDeleted()])
        .then(([suppliers,deleteCount])=> res.render('suppliers/searchSupplier',{
            deleteCount,
            suppliers:multipleMongooseToObject(suppliers)
        }))
        .catch(next)
    }
    createSupplier(req,res,next){
        if(req.session.adminEmail){
           res.render('suppliers/createSupplier')
        }else{
            res.redirect('/loginAdmin')
        }
    }
    storeSupplier(req,res,next){
        req.body.imageSupplier = req.file.path.split('\\').slice(4).join('\\'); 
        const supplier = new Supplier(req.body)
        supplier.save()
        .then(()=>res.redirect('/suppliers'))
        .catch(next)
    }
    editSupplier(req,res,next){
        Supplier.findById(req.params.id)
        .then((supplier)=>res.render('suppliers/editSupplier',{
            supplier: mongooseToObject(supplier)
        }))
        .catch(next)
    }
    updateSupplier(req,res,next){
        if(req.file){
            req.body.imageSupplier = req.file.path.split('\\').slice(4).join('\\');
        }else{
            console.log('no')
        }
        Supplier.updateOne({ _id : req.params.id },req.body)
        .then(()=>res.redirect('/suppliers'))
        .catch(next)
    }
    deleteSupplier(req,res,next){
        Supplier.delete({ _id:req.params.id })
        .then(()=>res.redirect('/suppliers'))
        .catch(next)
    }
    trashSupplier(req,res,next){
        Supplier.findDeleted({})
        .then(suppliers =>res.render('suppliers/trashSupplier',{
            suppliers:multipleMongooseToObject(suppliers)
        }))
        .catch(next)

    }
    destroySupplier(req,res,next){
        Supplier.delete({_id : req.params.id})
        .then(() =>res.redirect('back'))
        .catch(next)
    }
    restoreSupplier(req,res,next){
        Supplier.restore({_id : req.params.id})
        .then(()=>res.redirect('/suppliers'))
        .catch(next)
    }
}
module.exports = new SuppliersController();
