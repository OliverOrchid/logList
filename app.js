var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// app.get('./',function(req,res){
//
//   let {exec} = require("child_process")
//
//   sysCmd ="svn log --xml -r{2019-06-12}:HEAD  C:/SVNTestwc"
//   exec(sysCmd,function(error,stdout,stderr){
//     if(error){
//       console.warn(error)
//       return
//     }
//     showData = JSON.stringify(`stdout:${stdout}`)
//     // showData = showData01.toJSON()
//     // let json = JSON.parse(showData)
//     console.log("res")
//     res.end(showData)
//   })
// })


app.listen(2333,function(){
  console.log("------App now is listening on the port 2333-----\n\n\n")
})

module.exports = app;
