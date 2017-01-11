/**
 * Created by paulo on 11-Jan-17.
 */

var socket = io.connect('http://192.168.1.25:3000');

document.addEventListener('deviceready', function () {
    console.log("veio aqui passear");
    socket.on('connect', function () {
        socket.on('text', function (text) {
            alert(text);
        });
    });
});
