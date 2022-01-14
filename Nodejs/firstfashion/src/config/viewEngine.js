const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');

function viewEngine(app) {
    // Template engine setup
    app.engine('hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../../resources/views'));
    
};

module.exports = viewEngine;
