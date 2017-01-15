/**
 * Created by paulo on 11-Jan-17.
 *
 * Users sockets management
 */

var clients = {};
var currentGames = {};

exports.start = function (io) {

    io.sockets.on('connection', function (client) {
        console.log('Client connected');

        client.on('username', function (data) {
            clients[data.user] = client.id;
            io.sockets.emit('refreshPlayers', sendPlayers());
            console.log(clients);
        });

        client.on('new_game_request', function (data) {
            console.log('new game request: ' + data.user);
            var opponent = data.user;

            //send request to player
            io.sockets.socket(clients[opponent]).emit('new_game', {user: data.opponent});
        });

        client.on('new_game_reply', function (data) {
            console.log(data);
            //se sim, gerar key aleatoria e adicionar jogo aos jogos existentes com esta key, mandar esta key aos players e começar o jogo com troca de linhas
            if (data.confirmation == 'yes') {
                //enviar para os dois jogadores algo para eles começarem o jogo
            }
            //se não, mandar nega ao player que fez o pedido inicial
            else {
                io.sockets.socket(clients[data.user]).emit('reply_to_request_game', {reply: 'no', user: data.opponent});
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
            console.log(clients);
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



