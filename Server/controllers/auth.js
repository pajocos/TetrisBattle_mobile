var db = require("../models/db");

exports.loginUser = function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;

    console.log(user + " " + pass);

    db.findUser(user, pass, function (result) {
        if (result) {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({login: 'success'});
        }
        else {
            res.status(401);
            res.setHeader('Content-Type', 'application/json');
            res.json({login: 'error'});
        }
    });
}

exports.registerUser = function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;

    db.insertUser(user, pass, function (result) {
        if (result) {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({register: 'success'});
        }
        else {
            res.status(401);
            res.setHeader('Content-Type', 'application/json');
            res.json({register: 'error'});
        }
    })
}