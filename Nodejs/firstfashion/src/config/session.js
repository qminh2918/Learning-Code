// const session = require('express-session');
// const connectMongo = require('connect-mongo').default;

// const MongoStore = connectMongo(session);
// const sessionStore = new MongoStore({
//     url: "mongodb://localhost:27017/first_fashion",
//     // autoRemove: 'native',
//     autoReconnect: true
// });

// const configSession = (app) => {
//     app.use(session({
//         key: 'express.sid',
//         secret: 'keyboard cat',
//         store: sessionStore,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             maxAge: 1000*60*60*24
//         }
//     }));
// }

// module.exports = configSession;
