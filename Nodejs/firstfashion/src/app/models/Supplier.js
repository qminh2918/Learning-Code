const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Supplier = new Schema({
    nameSupplier:{type:String,require:true},
    imageSupplier:{type:String,require:true}
});
Supplier.plugin(mongooseDelete,{
    deleteAt:true,
    overrideMethods:'all'
})
module.exports = mongoose.model('Supplier',Supplier)