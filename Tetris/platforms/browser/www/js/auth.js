/**
 * Created by paulo on 22/12/2016.
 */

$("#auth-button").click(function () {

    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "http://192.168.1.5:3000/API/login",
        data: $.param({username: username, password: password}),
        dataType: "json",
        success: function (data) {
            console.log(data);
            alert("Success");
        },
        error: function (result) {
            console.log(result);
            alert("Error");
        }
    });
});