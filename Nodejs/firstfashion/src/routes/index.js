const logoutAdminRouter = require('./logoutAdmin')
const loginAdminRouter = require('./loginAdmin')
const manageRouter = require('./manage');
const productsRouter = require('./products');
const colectionsRouter = require('./colections')
const responseProductRouter = require('./responseProduct')
const usersRouter = require('./users');
const personnelRouter = require('./personnel')
const suppliersRouter = require('./suppliers')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const contactRouter = require('./contact')
const categoryRouter = require('./category')
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const homeRouter = require('./home');
const registrationRouter = require('./registration');

    //const notFoundRouter = require('./notFound')
    //const redirectIfAuthenticatedMiddleware = require('../app/middleware/redirectIfAuthenticatedMiddleware')
    // const authMiddleware = require('../app/middleware/authMiddleware')
function route(app) {
    app.use('/loginAdmin', loginAdminRouter);
    app.use('/suppliers',suppliersRouter);
    app.use('/personnel', personnelRouter)
    app.use('/logoutAdmin', logoutAdminRouter)
    app.use('/users', usersRouter)
    app.use('/category', categoryRouter)
    app.use('/contact', contactRouter)
    app.use('/cart',cartRouter)
    app.use('/order', orderRouter)
    app.use('/products', productsRouter);
    app.use('/colections',colectionsRouter)
    app.use('/responseProduct', responseProductRouter)
    app.use('/manage', manageRouter);
    app.use('/registration', registrationRouter);
    app.use('/login', loginRouter);
    app.use('/logout', logoutRouter);
    app.use('/', homeRouter);
    app.use((req, res) => {
        res.render('notFound')
           
    });

}
module.exports = route;