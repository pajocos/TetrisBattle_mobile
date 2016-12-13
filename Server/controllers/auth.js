var db = require("../models/db");

exports.loginUser = function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;

    db.findUser(user, pass, function (result) {
        if (result)
            res.sendStatus(200);
        else
            res.sendStatus(401);
    });
}

exports.registerUser = function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;

    db.insertUser(user, pass, function (result) {
        if (result)
            res.sendStatus(200);
        else
            res.sendStatus(401);
    })
}