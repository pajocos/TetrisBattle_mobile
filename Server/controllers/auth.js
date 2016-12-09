var db = require("../models/db");

exports.loginUser = function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;

    console.log(req);
    console.log(user);
    console.log(pass);

    res.sendStatus(200);
}