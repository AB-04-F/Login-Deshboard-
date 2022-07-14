var createError = require("http-errors");
var ejs = require("ejs");
require("dotenv").config();
var path = require("path");
const cors = require("cors");
var express = require("express");

var app = express();
var http = require("http").Server(app);
http.listen(process.env.ApiPort, function() {
    console.log("listening on *:" + process.env.ApiPort);
});
var port = 4000;
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
// var controllers = require("./controllers/api");
const session = require("express-session");
const { Server } = require("http");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
    session({
        secret: "Akash",
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

app.use("/", indexRouter);
// app.use("/api", controllers);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// app.use(function(req, res, next) {
//     console.log(req.session.loggedIn);
//     if (req.session.loggedIn) {
//         res.redirect("deshboard");
//     } else {
//         next();
//     }
// });

// app.use(function(req, res, next) {
//     console.log(req.session.loggedIn);
//     if (!req.session.loggedIn) {
//         res.redirect("login");
//     } else {
//         next();
//     }
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

//app.get("/", (req, res) => {
//console.log("Hello word");
//res.send("Page Listening!");
//});

// var http = require("http").Server(app);
// http.listen(process.env.ApiPort, function() {
//     console.log("listening on *:" + process.env.ApiPort);
// });
app.listen(port, (req, res) => {
    console.log(`server is running on ${port}`);
});
// app.use("/api", require("./controllers/api"));
// module.exports = app;