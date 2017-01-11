/**
 * Created by paulo on 11-Jan-17.
 */

var socket = io.connect('http://192.168.1.25:3000');

document.addEventListener('deviceready', function () {
    socket.on('connect', function () {
        console.log(GLOBAL_USERNAME);
        socket.emit('username', GLOBAL_USERNAME);
    });
});
