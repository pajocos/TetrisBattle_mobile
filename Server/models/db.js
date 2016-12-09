var pg = require('pg');
var config = require('../config').sqlConfig;

var client = new pg.Client(config);

// connect to our database
client.connect(function (err) {
    if (err) throw err;
    else
        console.log("Connected to database!!");
});

/*exports.loginUser = function (user, pass) {
    // execute a query on our database
    client.query('SELECT username, password FROM users where username = $1::text', [user], function (err, result) {
        if (err) throw err;

        // just print the result to the console
        console.log(result.rows[0]);

        // disconnect the client
        client.end(function (err) {
            if (err) throw err;
        });
    });
}*/
