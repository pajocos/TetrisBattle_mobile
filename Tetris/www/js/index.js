/**
 * Created by paulo on 22/12/2016.
 */

var URL = "192.168.1.25";

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('offline', this.offline.bind(this), false);
    },
    onDeviceReady: function () {
        if (window.localStorage.getItem('play_sound') == null) {
            window.localStorage.setItem('play_sound', true);
        }
    },
    offline: function () {
        navigator.notification.alert('No internet connection', function () {
            window.location.assign('index.html');
        }, 'Information', 'Close dialog');
    }
};

app.initialize();

$('#login-form-link').click(function (e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});
$('#register-form-link').click(function (e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

$("#login-submit").click(function (e) {

    var username = $('#username1').val();
    var password = $('#password1').val();
    var rememberMe = $('#checkbox1').val();

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "http://" + URL + ":3000/API/login",
        data: $.param({username: username, password: password}),
        dataType: "json",
        success: function () {
            var storage = window.localStorage;
            storage.setItem('username', username);
            if (rememberMe == 'on') {
                storage.setItem('remember', true);
                //In future, put webtoken for authenticity
            }
            window.location.assign("home.html");
        },
        error: function (result) {
            console.log(result);
            alert("Check your username and password");
        }
    });
    e.preventDefault();
});

$("#register-submit").click(function (e) {

    var username = $('#username2').val();
    var password = $('#password2').val();
    var confirmPassword = $('#confirm-password').val();

    if (confirmPassword !== password) {
        alert("Passwords doesn't match!");
        e.preventDefault();
    }
    else {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "http://" + URL + ":3000/API/register",
            data: $.param({username: username, password: password}),
            dataType: "json",
            success: function () {
                alert("Success! Login and enjoy the game")
            },
            error: function () {
                e.preventDefault();
                alert("Some error happened. Try again please");
            }
        });
    }
});