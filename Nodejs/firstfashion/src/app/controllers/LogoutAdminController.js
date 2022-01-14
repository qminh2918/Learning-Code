const Admin = require('../models/Admin');
class LogoutAdminController{
    index(req,res){
      

        //    req.session.destroy(()=>{
        //        res.redirect('/./loginAdmin');
        //    })
       
        delete req.session.adminEmail;
        res.redirect('/./loginAdmin');
    }
}
module.exports = new LogoutAdminController;
