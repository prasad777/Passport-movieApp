let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let dbConfig = require('../db');
let cookieParser = require('cookie-parser');
let app = express();

mongoose.connect(dbConfig.url, function(err, res){
    //useMongoClient: true;
    if(err){
        console.log('Error connecting to:' + dbConfig.url + '.' + err) ;
    } else {
        console.log('MongoDb connected successfully to :' + dbConfig.url);
    }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Configuring Passport


let passport = require('passport');
let expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());


var flash = require('connect-flash');
app.use(flash());




// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/movie')(passport);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
