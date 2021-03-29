var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var wcdRouter = require("./routes/wcd");
var wcdFIXEDRouter = require("./routes/wcdfix");

var app = express();

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// // set up the session
// app.use(
//   session({
//     secret: "app",
//     name: "app",
//     resave: true,
//     saveUninitialized: true,
//     // cookie: { maxAge: 6000 } /* 6000 ms? 6 seconds -> wut? :S */
//   })
// );
app.use(function (req, res, next) {
  if (req.url.includes("/wcdfix")) {
    res.setHeader("Cache-Control", "no-cache, no-store");
  }
  // else if (req.url.match("/")) {
  //   res.setHeader("Cache-Control", "no-cache, no-store");
  // }
  next();
});

// app.use(
//   "/",
// function (req, res, next) {
//   res.setHeader("Cache-Control", "no-cache, no-store");
//   next();
// },
//   indexRouter
// );
// app.use(
//   "/wcdfix",
//   function (req, res, next) {
//     res.setHeader("Cache-Control", "no-cache, no-store");
//     next();
//   },
//   wcdFIXEDRouter
// );
app.use("/", indexRouter);
app.use(
  "/wcdfix",
  function (req, res, next) {
    res.setHeader("Cache-Control", "no-cache, no-store");
    next();
  },
  wcdFIXEDRouter
);
app.use(
  "/users",
  function (req, res, next) {
    res.setHeader("Cache-Control", "no-cache, no-store");
    next();
  },
  usersRouter
);
app.use("/wcd", wcdRouter);

// require("./routes/wcd_fix")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
