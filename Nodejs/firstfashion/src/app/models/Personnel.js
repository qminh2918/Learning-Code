const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Personnel = new Schema({
    image:{ type: String, require: true },
    fullName: { type: String, require: true },
    gender: { type: String, require: true },
    dateOfBirth: { type: String, require: true },
    address: { type: String, require: true },
    numberPhone: { type: String, require: true },
    position: { type: String, require: true }
}, {
    timestamps: true,
});
Personnel.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
})
module.exports = mongoose.model('Personnel', Personnel)