/**
 * Created by paulo on 11-Jan-17.
 *
 * Users sockets management
 */

var clients = {};

exports.start = function (io) {

    io.sockets.on('connection', function (client) {
        console.log('Client connected');

        client.on('username', function (data) {
            clients[data] = client.id;
            console.log(clients);
        });

        client.on('disconnect', function () {
            console.log('Client disconnected');
        });
    });
}



