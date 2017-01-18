/**
 * Created by paulo on 11-Jan-17.
 *
 * Users sockets management
 */

var clients = {};
var clients_playing = {};

exports.start = function (io) {

    io.sockets.on('connection', function (client) {

        client.on('username', function (data) {
            clients[data.user] = client.id;
            io.sockets.emit('refreshPlayers', sendPlayers());
            console.log('Client connected: ' + JSON.stringify(clients));
        });

        client.on('new_game_request', function (data) {
            io.to(clients[data.user]).emit('new_game', {user: data.user, initial_user: data.initial_user});
        });

        client.on('new_game_reply', function (data) {

            if (data.confirmation == 'yes') {
                io.to(clients[data.initial_user]).emit('reply_to_request_game', {reply: 'yes', user: data.user});
                io.to(clients[data.user]).emit('reply_to_request_game', {reply: 'yes', user: data.initial_user});
            }
            else {
                io.to(clients[data.initial_user]).emit('reply_to_request_game', {reply: 'no', user: data.user});
            }
        });

        client.on('start_playing', function (data) {
            clients_playing[data.user] = client.id;
            console.log('Clients playing: ' + JSON.stringify(clients_playing));
        });

        client.on('send_line', function (data) {
            var dest_user = data.user;
            var numLines = data.num;

            io.to(clients_playing[dest_user]).emit('receive_line', {num: numLines});
        });

        client.on('game_over', function (data) {
            io.to(clients_playing[data.user]).emit('win_game', {});

            delete clients_playing[data.user];

            for (var key in clients_playing) {
                if (clients_playing.hasOwnProperty(key) && data.id == clients_playing.key) {
                    delete clients_playing[key];
                    break;
                }
            }
        });

        client.on('disconnect', function (data) {

            for (var key in clients) {
                if (clients.hasOwnProperty(key) && data.id == clients.key) {
                    delete clients[key];
                    break;
                }
            }

            io.sockets.emit('refreshPlayers', sendPlayers());
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
    return data;
}