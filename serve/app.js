const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore=require('connect-mongo');

const indexRouter = require('./routes/index');

const useRouter=require('./routes/user')

const app = express();

const {DBHOST,DBPORT,DBNAME}=require('./config/config')
app.use(session({
  name:'sid',
  secret: 'keyboardCat',
  saveUninitialized:false,
  resave: true,
  store:MongoStore.create({
    mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: { 
    httpOnly:true,
    maxAge:1000*60*60*24*7
   }
}))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);
// app.use('/api',accountapi);
app.use('/',useRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app
