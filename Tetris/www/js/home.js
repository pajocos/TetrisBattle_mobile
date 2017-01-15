/**
 * Created by paulo on 11-Jan-17.
 */

$(function () {

    var socket = io.connect('http://' + URL + ':3000');
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
        var username = $('.active').html();
        if (username == null) {
            alert("No opponent!");
        }
        else {
            window.localStorage.setItem('opponent', username);
            window.location = "game.html";
        }
    });
}

