/**
 * Created by paulo on 12-Jan-17.
 */

$(function () {

    var socket = io.connect('http://' + URL + ':3000');

    socket.on('connect', function () {
        //var username = window.localStorage.getItem('opponent');
        //socket.emit('new_game_request', {user: username, opponent: window.localStorage.getItem('username')});
    });
});