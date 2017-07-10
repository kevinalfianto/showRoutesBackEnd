var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var index = require('./routes/index');
var create = require('./routes/create');
var destroy = require('./routes/delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//there are 3 pages that can be accessed
app.use('/', index);
app.use('/create', create);
app.use('/delete', destroy);

const sequelize = new Sequelize('postgres://hgzkizzbpxqgbj:8e4dd6538406491dc132eed304ceeb3b827af144545a58f1bc47ef5b747264ff@ec2-50-19-83-146.compute-1.amazonaws.com:5432/dcp3eq9d2lg7ju');

//check wether the connection has been made
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
     })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
     });

//mysql database only has 1 table positions that contain attributes latitude and longitude
const Position = sequelize.define('position', {
    latitude: {
        type: Sequelize.FLOAT
    },
    longitude: {
        type: Sequelize.FLOAT
    }
});

// force: true will drop the table if it already exists
Position.sync({force: true}).then(() => {
  // Table created
  return Position.create({
    latitude: -10,
    longitude: 10
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
