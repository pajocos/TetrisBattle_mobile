/**
 * Created by paulo on 11-Jan-17.
 *
 * Users sockets management
 */

var socket;

exports.start = function (io) {
    socket = io;

    io.sockets.on('connection', function (socket) {
        console.log('socket connected');

        socket.on('disconnect', function () {
            console.log('socket disconnected');
        });

        socket.emit('text', 'wow. such event. very real time.');
    });
}



