class LogoutController {
    index(req, res) {
        // req.logout();
        // res.redirect('/',{
        //     layout: 'main1.hbs'
        // })
        req.logout();
        req.session.destroy(() => {
          res.redirect('/');
        })
    }
};

module.exports = new LogoutController;
