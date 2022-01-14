module.exports = (req,res,next)=>{
     if(req.session.adminEmail){
       console.log("test1",req.session.adminEmail)
          return res.redirect('/./manage')
    }
    next()
}
