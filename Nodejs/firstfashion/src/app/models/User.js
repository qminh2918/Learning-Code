// const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const User = new Schema({

//         email:{type:String, trim: true, unique: true, required: true},
//         password:{type:String,required: true, trim: true, length:6},
//     //     cart: {
//     //     type: Object,
//     //     required: false
//     //   },
//     // role: {type: String, enum: ['admin', 'customer']},
   
//     //rePasswordUser:{type:String,required: true},
// },{
//     timestamps:true,
// });

// User.statics = {      // statics chỉ sử dụng trong phạm vi để tìm các bản ghi 
//     createNew(item) {
//         return this.create(item); // Tạo item mới và return ra một promise 
//     },
//     findByEmail(email) {
//         return this.findOne({email: email}).exec();
//     },
//     findUserById(id) {
//         return this.findById(id).exec();
//     }
// };
// User.methods = {      // method sử dụng khi đã tìm được bản ghi, tìm được mật khẩu rồi đem so sánh
//     comparePassword(password) {
//         return bcrypt.compare(password, this.password)
//     }
// }

// //add plugin
// User.plugin(mongooseDelete,{
//     deleteAt:true,
//     overrideMethod:'all'
// })
// module.exports = mongoose.model('User',User)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {type: String, required: true, trim: true, unique: true,},
    role: {type: String, enum: ['admin', 'customer']},
    password: {type: String, required: true, minlength: 6},
});

userSchema.statics = {      // statics chỉ sử dụng trong phạm vi để tìm các bản ghi 
    createNew(item) {
        return this.create(item); // Tạo item mới và return ra một promise 
    },
    findByEmail(email) {
        return this.findOne({email: email}).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    }
};
userSchema.methods = {      // method sử dụng khi đã tìm được bản ghi, tìm được mật khẩu rồi đem so sánh
    comparePassword(password) {
        return bcrypt.compare(password, this.password)
    }
}


const userModel = mongoose.model('user', userSchema)

module.exports = userModel

