var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash')
var session = require('express-session')

var sassMiddleware = require('node-sass-middleware');

var fileupload = require('express-fileupload')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var adminPortfolio = require('./routes/portfolio');
var loginPortfolio = require('./routes/login');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Flash 
app.use(session({
  name: "my_session",
  secret: "my_secret2",
  resave: false,
  saveUninitialized: true
}))
app.use(flash())


// fileupload
app.use(fileupload({
  createParentPath: true
}))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// admin routes
app.use("/admin", express.static(path.join(__dirname, 'public')));
app.use("/admin/:any", express.static(path.join(__dirname, 'public')));

app.use('/', loginPortfolio);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', adminRouter);
app.use('/', adminPortfolio);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
