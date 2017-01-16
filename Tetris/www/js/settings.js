/**
 * Created by paulo on 15-Jan-17.
 */

$('#top').click(function (e) {
    window.location = 'home.html';
    e.preventDefault();
});

$(function () {
    $('#music').change(function () {
        if ($(this).is(":checked")) {
            window.localStorage.setItem('background_sound', true);
        }
        else {
            window.localStorage.setItem('background_sound', false);
        }
    });
});
