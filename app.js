var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
var subjectRouter = require('./routes/subjectRouter')
require('dotenv').config();
var app = express();
const server = require('http').createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const bodyParser = require('body-parser');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/subject', subjectRouter)
console.log(process.env.USER_NAME_DB,process.env.PASSWORD_DB)

mongoose.connect(`mongodb+srv://${process.env.USER_NAME_DB}:${process.env.PASSWORD_DB}@cluster0-lszdj.mongodb.net/test?retryWrites=true&w=majority`)
var db = mongoose.connection;

app.use(bodyParser.json()); // To deserialize body from request as json
app.use(bodyParser.urlencoded({ extended: false  })); // To deserialize body from request
app.use(cors());  //using the cors for cross origin support while deploying online

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

var PORT = process.env.PORT || 5000;  //use the process.env.PORT for later deployment or currently use port 5000 on local

server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));

module.exports = app;
