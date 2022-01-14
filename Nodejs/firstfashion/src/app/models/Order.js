const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema({
    user: {type: Schema.Types.ObjectId,ref: "User"},
    cart: { type: Object },
    fullName: {type: String},
    phoneNumber: {type: Number,required: true},
    address: {type: String,required: true},
    status: { type:Number,default:0}
},{
        timestamps:true,
   
});
module.exports = mongoose.model('Order', Order)