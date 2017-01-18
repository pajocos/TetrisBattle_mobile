/**
 * Created by paulo on 11-Jan-17.
 */

var socket;
var sound_ButtonUp;
var background_sound;
var isSettingsOpen;
var playSound;
var URL = "192.168.1.25";

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('backbutton', this.backButton.bind(this), false);
        document.addEventListener('pause', this.pause.bind(this), false);
        document.addEventListener('resume', this.resume.bind(this), false);
    },
    onDeviceReady: function () {
        playSound = window.localStorage.getItem('play_sound');
        $('#settings-panel').hide();

        isSettingsOpen = false;
        initConnections();
        playMusic();

        sound_ButtonUp = new Media('/android_asset/www/img/sounds/SFX_ButtonUp.wav');
    },
    backButton: function (e) {
        e.preventDefault();
        navigator.notification.confirm("Are you sure you want to exit?", function (button) {
            if (button == 1) {
                navigator.app.exitApp();
            }
        }, "Confirmation", "Yes,No");
    },
    pause: function () {
        background_sound.setVolume('0.0');
    },
    resume: function () {
        background_sound.setVolume('0.4');
    }

};

app.initialize();

function initConnections() {

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
        navigator.notification.confirm("Start game with " + data.initial_user + "?", function (button) {
            if (button == 1) {
                socket.emit('new_game_reply', {confirmation: 'yes', user: data.user, initial_user: data.initial_user});
            } else {
                socket.emit('new_game_reply', {confirmation: 'no', user: data.user, initial_user: data.initial_user});
            }
        }, "Confirmation", "Yes,No");
    });

    socket.on('reply_to_request_game', function (data) {
        if (data.reply == 'no') {
            alert(data.user + " doesn't like you :(");
            window.location.assign("home.html");
        }
        else {
            window.localStorage.setItem('opponent', data.user);
            window.location.assign("game.html");
        }
    });

    updateLabels();
    startNewGame();
};

$('#settings').click(function () {
    if (playSound) {
        sound_ButtonUp.play();
    }
    if (!isSettingsOpen) {
        isSettingsOpen = true;
        $('#settings-panel').show();
        if (playSound) {
            $('.music').prop("checked", true);
        }
    }
    else {
        isSettingsOpen = false;
        $('#settings-panel').hide();
    }

});

function updateLabels() {
    $.ajax({
        type: "GET",
        contentType: "application/x-www-form-urlencoded",
        url: "http://" + URL + ":3000/API/getScore?username=" + window.localStorage.getItem('username'),
        success: function (data) {
            window.localStorage.setItem('high_score', data['high_score']);
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
            window.localStorage.setItem('exp_points', data['exp_points']);
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
        if (playSound) {
            sound_ButtonUp.play();
        }

        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
    });
}

function startNewGame() {
    $("#newGame-submit").click(function () {
        if (playSound) {
            sound_ButtonUp.play();
        }

        var initial_user = window.localStorage.getItem('username');
        var opponent = $('.active').html();
        window.localStorage.setItem('opponent', opponent);

        if (opponent == null) {
            alert("No opponent!");
        }
        else {
            $('.form-group').empty();
            $('.form-group').append('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>');
            socket.emit('new_game_request', {user: opponent, initial_user: initial_user});
        }
    });
}

function playMusic() {
    if (playSound) {
        background_sound = new Media('/android_asset/www/img/sounds/sound_home.mp3', null, null, function () {
            if (status == Media.MEDIA_STOPPED) {
                background_sound.play();
            }
        });
        background_sound.play();
        background_sound.setVolume('0.4');
    }
}


$('#music').change(function () {
    if ($(this).is(":checked")) {
        window.localStorage.setItem('play_sound', true);
        playSound = true;
        playMusic();
    }
    else {
        window.localStorage.setItem('play_sound', false);
        playSound = false;
        background_sound.stop();
    }
});

$('#top').click(function () {
    if (playSound) {
        sound_ButtonUp.play();
    }
    navigator.notification.alert('Game developed within the scope of Mobile Game Development.\nFaculty of Physics and Applied Informatics 2017, Lodz, Poland\n\nAuthors\n - Joao Morgado\n - Paulo Costa\n\n"You talked too much" by Anonymous', null, 'About', 'Close');
});