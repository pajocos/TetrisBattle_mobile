/**
 * Created by paulo on 12-Jan-17.
 */

$(function () {

    var socket = io.connect('http://' + URL + ':3000');

    socket.on('connect', function () {
        var username = window.localStorage.getItem('opponent');
        socket.emit('new_game_request', {user: username, opponent: window.localStorage.getItem('username')});
    });

    socket.on('new_game', function (data) {
        if (confirm('Start game with ' + data.opponent + '?')) {
            socket.emit('new_game_reply', {confirmation: 'yes', user: data.opponent});
        } else {
            socket.emit('new_game_reply', {confirmation: 'no', user: data.opponent});
        }
    });

    socket.on('reply_to_request_game', function (data) {
        if (data.reply == 'no') {
            alert("The player doesn't like you");
        }
        //começar jogo
        else {

        }
    });
});