/**
 * Created by paulo on 12-Jan-17.
 */

var URL = "192.168.1.25";
var opponent;
var username;

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('backbutton', this.backButton.bind(this), false);
        document.addEventListener('pause', this.pause.bind(this), false);
        document.addEventListener('resume', this.resume.bind(this), false);
        document.addEventListener('offline', this.offline.bind(this), false);
    },
    onDeviceReady: function () {
        playSound = window.localStorage.getItem('play_sound');

        loadSoundEffects();
        playSoundByName('sound_GameStart');

        socket = io.connect('http://' + URL + ':3000');

        setTimeout(playSoundByName('background_music'), 3000);

        socket.on('connect', function () {
            username = window.localStorage.getItem('username');
            opponent = window.localStorage.getItem('opponent');
            socket.emit('start_playing', {user: username});
        });

        socket.on('receive_line', function (data) {
            for (var i = 0; i < data.num; i++) {
                addTrash();
            }
            navigator.vibrate(500 * data.num * 0.5);
        });

        socket.on('win_game', function () {
            stopGame();
            updateScores(score, true);
            navigator.notification.alert('You won the game with ' + score + ' points', function () {
                window.location.assign("home.html");
            }, 'Winner', 'Go back to main menu');
        });
    },
    backButton: function (e) {
        e.preventDefault();
    },
    pause: function () {
        background_music.setVolume('0.0');
    },
    resume: function () {
        background_music.setVolume('0.4');
    },
    offline: function () {
        navigator.notification.alert('No internet connection', null, 'Information', 'Close dialog');
    }
};

app.initialize();

function updateScores(currentScore, winner) {
    //update high_score if bigger than previous one
    if (currentScore > window.localStorage.getItem('high_score')) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://" + URL + ":3000/API/updateScore",
            data: $.param({username: username, score: currentScore}),
            dataType: "json",
            success: function () {
                console.log("High_score updated");
            },
            error: function (result) {
                throw result;
            }
        });
    }

    if (winner) {
        var newXP = parseInt(window.localStorage.getItem('exp_points')) + parseInt(currentScore);
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://" + URL + ":3000/API/updatePoints",
            data: $.param({username: username, score: newXP}),
            dataType: "json",
            success: function () {
                console.log("exp points updated");
            },
            error: function (result) {
                throw result;
            }
        });
    }
}

function playMusic() {
    background_music = new Media('/android_asset/www/img/sounds/sound_game.mp3', null, null, function () {
        if (status == Media.MEDIA_STOPPED) {
            background_music.play();
        }
    });
    background_music.play();
    background_music.setVolume('0.4');
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

function playSoundByName(name) {
    if (playSound == 'true') {
        switch (name) {
            case 'sound_GameOver':
                sound_GameOver.play();
                break;
            case 'sound_GameStart':
                sound_GameStart.play();
                break;
            case 'sound_PieceDrop':
                sound_PieceDrop.play();
                break;
            case 'sound_PieceMoveLR':
                sound_PieceMoveLR.play();
                break;
            case 'sound_PieceRot':
                sound_PieceRot.play();
                break;
            case 'sound_PieceDown':
                sound_PieceDown.play();
                break;
            case 'sound_GameOver':
                sound_LineClear.play();
                break;
            case 'background_music':
                playMusic();
                break;
            default:
                break;
        }
    }
}