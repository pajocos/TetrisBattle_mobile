/**
 * Created by paulo on 13/12/2016.
 */
var db = require('../models/db')

exports.updateHighScore = function (req, res) {
    var user = req.body.username;
    var score = req.body.score;

    db.updateHighScore(user, score, function (result) {
        if (result) {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({update: 'success'});
        }
        else {
            res.status(401);
            res.setHeader('Content-Type', 'application/json');
            res.json({update: 'error'});
        }
    })
}

exports.getHighScore = function (req, res) {
    var user = req.query.username;

    db.getHighScore(user, function (result) {
        if (!result)
            res.sendStatus(400);
        else
            res.send(result);
    });
}

exports.updateExpPoints = function (req, res) {
    var user = req.body.username;
    var score = req.body.score;

    db.updateExpPoints(user, score, function (result) {
        if (result) {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({update: 'success'});
        }
        else {
            res.status(401);
            res.setHeader('Content-Type', 'application/json');
            res.json({update: 'error'});
        }
    })
}

exports.getExpPoints = function (req, res) {
    var user = req.query.username;

    db.getExpPoints(user, function (result) {
        if (!result)
            res.sendStatus(400);
        else
            res.send(result);
    });
}