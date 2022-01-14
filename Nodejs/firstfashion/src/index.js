const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const mongooseDBSession = require('connect-mongodb-session')(expressSession)
const Handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
const math = helpers.math();
const configHelpers = require('./config/helpers');
//const configSession =require('./config/session');
const app = express()
const port = 3000
    //const { request } = require('http');
const route = require('./routes');
const db = require('./config/db');
//connect
db.connect();
//config session

const store = new mongooseDBSession({
    uri: "mongodb://localhost:27017/first_fashion",
    autoReconnect: true,
    collection: "sessions",
});
Handlebars.registerHelper('ternary', require('handlebars-helper-ternary'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'))
    //sd được req.body đẩy lên trình duyệt
app.use(express.urlencoded({
    extended: true,
}), );

app.use(express.json())
//configSession(app);
app.use(expressSession({
    key: 'express.sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000*60*60*24
    }
}));



//enable flash message
app.use(connectFlash());
// Biến local
app.use((req, res, next) => {
    res.locals.errors = req.flash("error");
    res.locals.successes = req.flash("success");
    next();
});

app.use(passport.initialize());
app.use(passport.session());    // Gọi đến passport.deserializeUser lấy thông tin user cụ thể là _id đã lưu trong session.
app.use((req, res, next) =>{
    res.locals.adminLogin = req.session.adminEmail; 
    res.locals.userLogin = req.isAuthenticated();
    res.locals.session = req.session
    if(req.session.passport){
        res.locals.email = req.user.email;
      }   
   next()
});
app.engine('hbs', handlebars({
extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    }
}));
app.use(configHelpers)

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//set router
route(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})