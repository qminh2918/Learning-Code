const Admin = require('../models/Admin');
module.exports = (req,res,next)=>{
     Admin.findOne({ email:req.session.adminEmail },(error,admin)=>{
        //  console.log(admin)
        if( error|| !admin)
             return res.redirect('/./loginAdmin')
           next()
      })
}