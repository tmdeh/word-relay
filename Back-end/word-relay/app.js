var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const nickname = require('./routes/nickname');
const room = require('./routes/room');
const index = require('./routes/index');

const {verify} = require('./lib/jwt')

var app = express();

const dbconnect = require('./database/connect');

// view engine setup
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../../../Front-end/word-relay/build')));
app.use(express.static(path.join(__dirname, './build')));
app.use(cors());
dbconnect();

app.use('/nickname', nickname);
app.use('/room', verify, room);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500).json({
    status : err.status || 500,
    message : err.message
  });
});

module.exports = app;
