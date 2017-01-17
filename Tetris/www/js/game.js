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

function updateScores(currentScore) {
    //update high_score if bigger than previous one
    if (currentScore > window.localStorage.getItem('high_score')) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://" + URL + ":3000/API/updateScore",
            data: $.param({username: username, score: currentScore}),
            dataType: "text",
            success: function () {
                console.log("High_score updated");
            },
            error: function (result) {
                throw result;
            }
        });
    }

    var newXP = parseInt(window.localStorage.getItem('exp_points')) + parseInt(currentScore);

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "http://" + URL + ":3000/API/updatePoints",
        data: $.param({username: username, score: newXP}),
        dataType: "text",
        success: function () {
            console.log("High_score updated");
        },
        error: function (result) {
            throw result;
        }
    });
}