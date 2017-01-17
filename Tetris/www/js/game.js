/**
 * Created by paulo on 12-Jan-17.
 */

var URL = "188.166.171.219";
var socket;
var opponent;
var key;
var username;

//SOUNDS
var background_music;
var sound_ButtonUp;
var sound_GameOver;
var sound_GameStart;
var sound_PieceDrop;
var sound_PieceMoveLR;
var sound_PieceRot;
var sound_PieceDown;
var sound_LineClear;

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        loadSoundEffects();
        sound_GameStart.play();
        setTimeout(function () {
            playMusic();
        }, 3000);
    }
};

app.initialize();

$(function () {

    socket = io.connect('http://' + URL + ':3000');

    socket.on('connect', function () {
        username = window.localStorage.getItem('username');
        opponent = window.localStorage.getItem('opponent');
        socket.emit('start_playing', {user: username});
    });

    playMusic();
});

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
            console.log("exp points updated");
        },
        error: function (result) {
            throw result;
        }
    });
}

function playMusic() {
    if (window.localStorage.getItem('background_sound')) {
        background_music = new Media('/android_asset/www/img/sounds/sound_game.mp3', null, null, function () {
            if (status == Media.MEDIA_STOPPED) {
                background_music.play();
            }
        });
        background_music.play();
        background_music.setVolume('0.4');
    }
}

function loadSoundEffects() {
    sound_GameOver = new Media('/android_asset/www/img/sounds/SFX_GameOver.ogg');
    sound_GameStart = new Media('/android_asset/www/img/sounds/SFX_GameStart.ogg');
    sound_PieceDrop = new Media('/android_asset/www/img/sounds/SFX_PieceHardDrop.ogg');
    sound_PieceMoveLR = new Media('/android_asset/www/img/sounds/SFX_PieceMoveLR.ogg');
    sound_PieceRot = new Media('/android_asset/www/img/sounds/SFX_PieceRotateLR.ogg');
    sound_PieceDown = new Media('/android_asset/www/img/sounds/SFX_PieceSoftDrop.ogg');
    sound_LineClear = new Media('/android_asset/www/img/sounds/SFX_SpecialLineClearDouble.ogg');
}