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
            console.log(clients);
        });

        var data = sendPlayers();
        client.emit('refreshPlayers', data);

        client.on('disconnect', function () {
            //remover jogador da lista e mandar a lista para toda a gente de novo
            //client.emit('refreshPlayers', data);
            console.log('Client disconnected');
        });
    });
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



