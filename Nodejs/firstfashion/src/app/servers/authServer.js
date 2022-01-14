
// const userModel = require('../models/User');
// const bcrypt = require('bcrypt');
// const transValidation = require('../../../lang/vi');

// var saltRounds = 7;
// const register = (email, pass) => {
//     return new Promise(async (resolve,reject) => {
//         var userByEmail = await userModel.findByEmail(email)
//         if(userByEmail){
//             return reject(transValidation.account_in_use);
//         }
//         var salt = bcrypt.genSaltSync(saltRounds);
    
//         var userItem = {
//             email: email,
//             password: bcrypt.hashSync(pass, salt)
//         }
//         var user = await userModel.createNew(userItem)
//         resolve(user)
//     });  
// };

// module.exports = {
//     register: register
// };

const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const transValidation = require('../../../lang/vi');

var saltRounds = 7;
const register = (email, pass) => {
    return new Promise(async (resolve,reject) => {
        var userByEmail = await userModel.findByEmail(email)
        console.log(userByEmail)
        if(userByEmail){

            return reject(transValidation.account_in_use);
        }
        var salt = bcrypt.genSaltSync(saltRounds);
    
        var userItem = {
            email: email,
            password: bcrypt.hashSync(pass, salt)
        }
        var user = await userModel.createNew(userItem)
        resolve(user)
    });  
};

module.exports = {
    register: register
};