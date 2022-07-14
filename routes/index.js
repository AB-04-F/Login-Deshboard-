var express = require("express");
var router = express.Router();

var con = require("../dbconnection");
// const app = require("../app");
const session = require("express-session");

/* GET home page. */
router.get("/", function(req, res) {
    // console.log("test");
    res.render("index");
});

/* GET Login Page */
router.post("/login", function(req, res) {
    let name = req.body.username + " " + req.body.password + "";

    console.log(name);

    if (!name) {
        console.log("plz Enter the username and password!");

        return res.status(400).json({
            message: "Username or Password not present",
        });
    }

    var sql = `SELECT * FROM login WHERE user_name = "${req.body.username}" AND password =  ${req.body.password}`;

    con.query(sql, function(err, result) {
        if (result.length === 1) {
            console.log("Login User is Valid!");

            req.session.username = req.body.username;

            req.session.loggedIn = true;

            res.redirect("deshboard");
        } else {
            console.log("Invalid User!");

            res.render("index1");
        }
    });
});

function loggedIn(req, res, next) {
    console.log(loggedIn());
    if (req.session.loggedIn) {
        res.redirect("/deshboard");
    } else {
        res.redirect("/login");
    }
    next();
}

router.get("/deshboard", function(req, res) {
    con.query("SELECT * from employees1 ORDER BY id  ", function(err, rows) {
        let employees = err ? [] : rows;

        res.render("deshboard", {
            title: "Deshboard",
            username: req.session.username,
            employees: employees,
        });
    });
});

module.exports = router;