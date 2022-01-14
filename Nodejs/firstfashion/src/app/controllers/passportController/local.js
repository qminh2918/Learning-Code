const passport = require('passport');
const passportLocal = require('passport-local');
const userModel = require('../../models/User');
const transValidation =require('../../../../lang/vi');

var LocalStrategy = passportLocal.Strategy;

var initPassportLocal = () => {
    passport.use(new LocalStrategy({
        // mặc định local strategy sử dụng username và password
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true  // Sau khi passport xác thực xong sẽ gửi req về callback function  
    }, async (req, email, password, done) =>{
        try {
            var user = await userModel.findByEmail(email);
            if(!user){
                return done(null, false, req.flash("error", transValidation.login_failed));
            }
            var checkPassword = await user.comparePassword(password);
            if(!checkPassword){
                return done(null, false, req.flash("error", transValidation.login_failed)); 
                
            }
            return done(null, user);
        } catch (error) {
            return done(null, false, req.flash("error", transValidation.server_errors)); 
        }
    }));
    passport.serializeUser((user,done) => {   //function này ghi user vào trong session
        done(null, user._id);    // Chỉ cần lưu id của user để nhẹ bớt session
    });
    passport.deserializeUser((id, done ) => {
        userModel.findUserById(id)
        .then((user) => {
            return done(null, user);
        }).catch((error) => {
            return done(error, null) ; 
        });
    })
};

module.exports = initPassportLocal;



