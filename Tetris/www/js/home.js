/**
 * Created by paulo on 11-Jan-17.
 */

var socket;
var URL = "192.168.1.25";

$(function () {

    socket = io.connect('http://' + URL + ':3000');
    var username = window.localStorage.getItem('username');

    socket.on('connect', function () {
        socket.emit('username', {user: username});
    });

    socket.on('refreshPlayers', function (playersList) {
        $('#loggedPlayers').empty();
        var index = playersList.indexOf(username);
        playersList.splice(index, 1);
        if (playersList.length == 0) {
            $('#loggedPlayers').html('<h1>No available players :(')
        }
        else {
            for (var i = 0; i < playersList.length; i++) {
                $('#loggedPlayers').append('<li class="list-group-item">' + playersList[i] + '</li>')
            }
        }
        manageList();
    });

    socket.on('new_game', function (data) {
        if (confirm('Start game with ' + data.initial_user + '?')) {
            socket.emit('new_game_reply', {confirmation: 'yes', user: data.user, initial_user: data.initial_user});
        } else {
            socket.emit('new_game_reply', {confirmation: 'no', user: data.user, initial_user: data.initial_user});
        }
    });

    socket.on('reply_to_request_game', function (data) {
        if (data.reply == 'no') {
            alert(data.user + " doesn't like you :(");
            window.location = "home.html";
        }
        else {
            window.localStorage.setItem('opponent', data.user);
            window.location = "game.html";
        }
    });

    updateLabels();
    startNewGame();
});

$('#settings').click(function (e) {
    window.location.assign("settings.html");
    e.preventDefault();
});

function updateLabels() {
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "http://" + URL + ":3000/API/getScore?username=" + window.localStorage.getItem('username'),
        success: function (data) {
            $('#high_score').text(data['high_score']);
        },
        error: function (result) {
            throw result;
        }
    });

    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "http://" + URL + ":3000/API/getPoints?username=" + window.localStorage.getItem('username'),
        success: function (data) {
            $('#user_level').text(data['exp_points']);
        },
        error: function (result) {
            throw result;
        }
    });

    $('#username').html('<i class="fa fa-user" aria-hidden="true"></i>' + " " + window.localStorage.getItem('username'));
}

function manageList() {
    $("ul li").click(function () {
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
    })
}

function startNewGame() {
    $("#newGame-submit").click(function () {
        var initial_user = window.localStorage.getItem('username');
        var opponent = $('.active').html();
        window.localStorage.setItem('opponent', opponent);

        $('.form-group').empty();
        $('.form-group').append('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');

        if (opponent == null) {
            alert("No opponent!");
        }
        else {
            socket.emit('new_game_request', {user: opponent, initial_user: initial_user});
        }
    });
}

