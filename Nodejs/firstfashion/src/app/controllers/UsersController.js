const User = require('../models/User');
const Order = require('../models/Order');
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
class UsersController{
    index(req, res, next){        
        User.find({})
        .then((users) =>{           
            res.render('users',{
                users: multipleMongooseToObject(users),
            })
        })
        .catch(next)
    }
    searchUser(req, res, next){
        const userName = req.query.q;
        var regex = new RegExp(userName, 'i')
        User.find({  email:regex })
        .then((users) => res.render('users/searchUser',{
            users: multipleMongooseToObject(users)
        }))
        .catch(next)
    }
    createUser(req, res, next){
        res.render('users/createUser')
    }
}
module.exports = new UsersController();
