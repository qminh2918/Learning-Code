const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Admin = new Schema({
    email: { type:String, required: true },
    password: { type:String, required: true },
  });
  Admin.pre('save',function(next){
    const admin = this
    bcrypt.hash(admin.password,(error,hash)=>{
      admin.password = hash
      next()
    })
  })
module.exports = mongoose.model('Admin', Admin);
