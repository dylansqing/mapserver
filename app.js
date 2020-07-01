var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requestRouter = require('./routes/request');
var mailRouter = require('./routes/mails');
var dashRouter = require('./routes/dash');
//var uploadRouter = require('./routes/upload');
var videoRouter = require('./routes/video');
var smsRouter = require('./routes/sms');
var apiRouter = require('./routes/api');

var app = express();
require('./mongodb')(app)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
// app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Content-Type, Content-Length, Authorization, Accept, X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  if (req.url.indexOf('.') == -1) {
    let str = req.url.split('/')
    if (str[1] == 'request' || str[1] == 'video' || str[1] == 'sms' || str[1] == 'api') {
      res.header("Content-Type", 'application/json;charset=utf-8')
    }
  } else if (req.url.indexOf('.') !== -1) {
    let str = req.url.split('.')[2] ? req.url.split('.')[2] : req.url.split('.')[1]
    if (str === "js") {
      res.header("Content-Type", 'application/x-javascript')
    } else if (str === "html") {
      res.header("Content-Type", 'text/html;charset=utf8')
    } else if (str === "css") {
      res.header("Content-Type", 'text/css;charset=utf8')
    }
  }
  next()
});
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));


app.use('/index', indexRouter);
app.use('/dash', dashRouter);
app.use('/users1', usersRouter);
app.use('/request', requestRouter);
app.use('/mails', mailRouter);
app.use('/', indexRouter);
//app.use('/upload', uploadRouter);
app.use('/video', videoRouter);
app.use('/sms', smsRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  console.log(err.status);
  res.status(err.status || 500);
  res.render('error');
});

//设置html引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');


//集成swagger

module.exports = app;