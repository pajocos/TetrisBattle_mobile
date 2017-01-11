/**
 * Created by paulo on 11-Jan-17.
 */

$(function () {

    var socket = io.connect('http://192.168.1.25:3000');

    socket.on('connect', function () {
        var storage = window.localStorage;
        var user = storage.getItem('username');
        socket.emit('username', {user: user});
    });
});

