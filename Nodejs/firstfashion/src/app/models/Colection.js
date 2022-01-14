const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Colection = new Schema({
    nameColection:{type:String,require:true},
    imageColection:{type:String,require:true},
    descriptionColection:{type:String,require:true},
});
Colection .plugin(mongooseDelete,{
    deleteAt:true,
    overrideMethods:'all'
})
module.exports = mongoose.model('Colection ',Colection )