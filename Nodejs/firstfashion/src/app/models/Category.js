const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Category = new Schema({
    nameCategory:{type:String,require:true},
    nameProduct:{type:String,require:true},
    imageCategory:{type:String,require:true}
});
Category .plugin(mongooseDelete,{
    deleteAt:true,
    overrideMethods:'all'
})
module.exports = mongoose.model('Category ',Category )