const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
//const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const Product = new Schema({
    nameProduct: { type: String, require: true },
    supplier: { type: String, require: true },
    size: { type: [String] },
    quantity: { type: Number, require: true },
    originalPrice: { type: Number, require: true },
    sale: { type: Number, require: true },
    // currentPrice: { type: Number, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    note:{type: String, require:false},
    comment:[
        {
        status: { 
            type: Number,
            default: 0
        },
          content: {
            type: String
          },
          user: {type:String},
        }
        ],
    // status:{ type: String, require: true},
    
},{
  
    timestamps:true,

});

Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})
module.exports = mongoose.model('Product', Product)