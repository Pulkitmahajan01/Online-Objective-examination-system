var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var flash    = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const {success,error}=require('consola');
const { connect } = require("mongoose");
var index = require('./routes/index');
var students = require('./routes/students');
var courses = require('./routes/courses');
var faculties = require('./routes/faculties');
var make_exam = require('./routes/make_exam_controller');
var take_exam = require('./routes/take_exam_controller');
var admin = require('./routes/admin');
const db = require('./database/db');

db.connectToDatabase(process.env.APP_DB);
var app = express();

require('./config/passport')(passport);


app.use(logger('dev'));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const{DB,PORT}=require("./config/index");

app.use(session({secret: 'APP_SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', index);
app.use('/students', students);
app.use('/courses', courses);
app.use('/faculties', faculties);
app.use('/make_exam', make_exam);
app.use('/take_exam', take_exam);
app.use('/admin', admin);

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.send("error");
})
//const startApp=async()=>{
//    try{
//     await connect(DB,{useFindAndModify:true,
//         useUnifiedTopology:true,
//         useNewUrlParser:true
//         });
//         success({message:`Successfully connected to the db \n${DB}`,
//             badge: true
//         });

        
         
//          app.listen(PORT,()=>success({message:`Server started on Port ${PORT}`,
//          badge:true}));
 
//    }catch(err){
//     error({
//         message:`Unable to connect with database\n${err}`,
//         badge:true
//     });
//     startApp();
//    }
// };
 

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handling
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

app.use(function(err, req, res, next) {
    // res.json({ error: err });
  res.status(err.status || 500);
});*/

// startApp();
module.exports = app;