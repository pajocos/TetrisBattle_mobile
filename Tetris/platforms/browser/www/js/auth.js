/**
 * Created by paulo on 22/12/2016.
 */

$(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});

$("#login-submit").click(function (e) {

    var username = $('#username1').val();
    var password = $('#password2').val();
    var rememberMe = $('#checkbox1').val();
    console.log(rememberMe);

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "http://192.168.1.5:3000/API/login",
        data: $.param({username: username, password: password}),
        dataType: "text",
        success: function () {
            window.location = "home.html";
        },
        error: function (result) {
            console.log(result);
            alert("Check your username and password");
        }
    });
    e.preventDefault();
});