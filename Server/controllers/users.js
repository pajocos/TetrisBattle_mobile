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
            clients[data.user] = client.id;
            io.sockets.emit('refreshPlayers', sendPlayers());
            console.log(clients);
        });

        client.on('disconnect', function (socket) {

            for (var key in clients) {
                if (clients.hasOwnProperty(key) && socket.id == clients.key) {
                    delete clients[key];
                    break;
                }
            }

            io.sockets.emit('refreshPlayers', sendPlayers());
            console.log('Client disconnected');
            console.log(clients);
        });
    });

    //io.sockets.om()
}

function sendPlayers() {
    var data = [];
    for (var key in clients) {
        if (clients.hasOwnProperty(key)) {
            data.push(key);
        }
    }
    console.log("players list: " + data);
    return data;
}



