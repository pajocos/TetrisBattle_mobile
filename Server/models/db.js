var pg = require('pg');
var config = require('../config').sqlConfig;

var client = new pg.Client(config);

// connect to our database
client.connect(function (err) {
    if (err) throw err;
    else
        console.log("Connected to database!!");
});

exports.findUser = function (user, pass, callback) {
    // execute a query on our database
    client.query('SELECT username, password FROM users where username = $1', [user], function (err, result) {
        if (err)
            return callback(false);

        return callback(result.rows[0].password == pass);
    });
}

exports.insertUser = function (user, pass, callback) {
    client.query('insert into users (high_score,password,username,exp_points) values (0, $1,$2,0)', [user, pass], function (err) {
        if (err)
            return callback(false);

        return callback(true);
    });
}

exports.getHighScore = function (user, callback) {
    client.query('SELECT high_score FROM users where username = $1', [user], function (err, result) {
        if (err)
            return callback(false);

        return callback(result.rows[0]);
    });
}

exports.updateHighScore = function (user, high_score, callback) {
    client.query('UPDATE users SET high_score = $1 WHERE username=$2', [high_score, user], function (err) {
        if (err)
            return callback(false);

        return callback(true);
    });
}

exports.getExpPoints = function (user, callback) {
    client.query('SELECT exp_points FROM users where username = $1', [user], function (err, result) {
        if (err)
            return callback(false);

        return callback(result.rows[0]);
    });
}

exports.updateExpPoints = function (user, exp_points, callback) {
    client.query('UPDATE users SET exp_points = $1 WHERE username=$2', [exp_points, user], function (err) {
        if (err)
            return callback(false);

        return callback(true);
    });
}

// disconnect the client
/*client.end(function (err) {
 if (err) throw err;
 });*/
