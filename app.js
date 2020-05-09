var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');

var app = express();

// connect to the database
const mongooseConnection = require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

const loginController = require('./routes/loginController');
const jwtAuth = require('./lib/jwtAuth');

// middleware upload image

const storage = multer.diskStorage({
  destination: './public/assets/img',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.use(multer({
  storage: storage,
  dest: './public/assets/img',
  limits: {fileSize: 1000000},
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: the file must be a valid image");
  }
}).single('photo'));

/**
 * API routes
 */
app.use('/anuncios', require('./routes/api/anuncios'));
app.use('/api/anuncios', jwtAuth(), require('./routes/api/anuncios'));
app.use('/tags', require('./routes/api/tags'));
app.use('/api/authenticate', loginController.postJWT);

/**
 * WEBSITES routes
 */
app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array();
    err.message = isAPIRequest(req) ?
    { message: 'Not valid', errors: err.mapped() }
    : 'There have been one or more validation errors check them';
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

module.exports = app;