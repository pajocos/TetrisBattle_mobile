/**
 * Created by paulo on 12-Jan-17.
 */

var URL = "192.168.1.25";
var socket;
var opponent;
var key;
var username;

$(function () {

    socket = io.connect('http://' + URL + ':3000');

    socket.on('connect', function () {
        username = window.localStorage.getItem('username');
        opponent = window.localStorage.getItem('opponent');
        socket.emit('start_playing', {user: username});
    });

    socket.on('receive_line', function (data) {
        //add line to this user
    });
});


function sendLine(numLines) {
    socket.emit('send_line', {user: opponent, num: numLines});
}