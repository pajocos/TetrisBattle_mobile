/**
 * Created by paulo on 11-Jan-17.
 */

$(function () {

    var socket = io.connect('http://192.168.1.25:3000');
    var clients = [];

    socket.on('connect', function () {
        socket.emit('username', {user: window.localStorage.getItem('username')});
    });

    socket.on('refreshPlayers', function (playersList) {
        //comparar diferenças entre as duas listas

    });

    updateLabels();
    manageList();
    startNewGame();
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
    $("#newGame-submit").click(function(){
        var username = $('.active').html();
        alert(username);
        //start new game here
    });
}

