var CANVAS_WIDTH = 320;
var CANVAS_HEIGHT = 640;

var canvas;
var g;

var boardImg = new Image();
boardImg.src = "img/board.png";

var darkBlue = new Image();
darkBlue.src = "img/DarkBlue.jpg";

var green = new Image();
green.src = "img/Green.jpg";

var lightBlue = new Image();
lightBlue.src = "img/LightBlue.jpg";

var purple = new Image();
purple.src = "img/Purple.jpg";

var red = new Image();
red.src = "img/Red.jpg";

var orange = new Image();
orange.src = "img/Orange.jpg";

var yellow = new Image();
yellow.src = "img/Yellow.jpg";

var trash = new Image();
trash.src = "img/Trash.jpg";

function game() {

    canvas = document.getElementById("canvas");

    g = canvas.getContext("2d");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    drawBackground();

    setTimeout(start, 3000);
    new Engine();
}

function drawBackground() {
    g.drawImage(boardImg, 0, 0);
}

function renderCanvas() {
    g.drawImage(boardImg, 0, 0);

    for (var i = 0; i < 4; i++) {
        var x = shadowX + getX(curPiece, i);
        var y = shadowY - getY(curPiece, i);
        g.fillStyle = "black";
        g.fillRect(x * 32, (BOARD_HEIGHT - y - 1) * 32, 32, 32);
    }

    for (var i = 0; i < 4; i++) {
        var x = curX + getX(curPiece, i);
        var y = curY - getY(curPiece, i);
        g.beginPath();
        g.strokeStyle = "black";
        g.moveTo(x * 32, (BOARD_HEIGHT - y - 1) * 32);
        g.lineTo(x * 32 + 32, (BOARD_HEIGHT - y - 1) * 32);
        g.lineTo(x * 32 + 32, (BOARD_HEIGHT - y - 1) * 32 + 32);
        g.lineTo(x * 32, (BOARD_HEIGHT - y - 1) * 32 + 32);
        g.lineTo(x * 32, (BOARD_HEIGHT - y - 1) * 32);
        g.stroke();
        g.closePath();
        var shape = curPiece.pieceShape;
        if (shape === "ZShape")
            g.drawImage(darkBlue, x * 32, (BOARD_HEIGHT - y - 1) * 32);
        else if (shape === "SShape")
            g.drawImage(green, x * 32, (BOARD_HEIGHT - y - 1) * 32);
        else if (shape === "LineShape")
            g.drawImage(lightBlue, x * 32, (BOARD_HEIGHT - y - 1) * 32);
        else if (shape === "TShape")
            g.drawImage(purple, x * 32, (BOARD_HEIGHT - y - 1) * 32);
        else if (shape === "SquareShape")
            g.drawImage(red, x * 32, (BOARD_HEIGHT - y - 1) * 32);
        else if (shape === "LShape")
            g.drawImage(orange, x * 32, (BOARD_HEIGHT - y - 1) * 32);
        else if (shape === "MirroredLShape")
            g.drawImage(yellow, x * 32, (BOARD_HEIGHT - y - 1) * 32);
    }

    for (var y = 0; y < 20; y++) {
        for (var x = 0; x < 10; x++) {
            var shape = pieceAt(x, BOARD_HEIGHT - y - 1);
            if (shape === "ZShape")
                g.drawImage(darkBlue, x * 32, y * 32);
            else if (shape === "SShape")
                g.drawImage(green, x * 32, y * 32);
            else if (shape === "LineShape")
                g.drawImage(lightBlue, x * 32, y * 32);
            else if (shape === "TShape")
                g.drawImage(purple, x * 32, y * 32);
            else if (shape === "SquareShape")
                g.drawImage(red, x * 32, y * 32);
            else if (shape === "LShape")
                g.drawImage(orange, x * 32, y * 32);
            else if (shape === "MirroredLShape")
                g.drawImage(yellow, x * 32, y * 32);
            else if (shape === "Trash")
                g.drawImage(trash, x * 32, y * 32);

            if (shape != "NoShape") {
                g.beginPath();
                g.strokeStyle = "black";
                g.moveTo(x * 32, y * 32);
                g.lineTo(x * 32 + 32, y * 32);
                g.lineTo(x * 32 + 32, y * 32 + 32);
                g.lineTo(x * 32, y * 32 + 32);
                g.lineTo(x * 32, y * 32);
                g.stroke();
                g.closePath();
            }
        }
    }
}

/*function keydownHandler(e) {
 if (e.keyCode === 13) // NUMPAD ENTER
 {
 start();
 } else if (e.keyCode === 32) // spacebar
 {
 jump();
 } else if (e.keyCode === 37) // left
 {
 checkMove(curPiece, curX - 1, curY);
 } else if (e.keyCode === 38) // up
 {
 curPiece = rotateRight(curPiece);
 checkMove(curPiece, curX, curY);
 } else if (e.keyCode === 39) // right
 {
 checkMove(curPiece, curX + 1, curY);
 } else if (e.keyCode === 40) // down
 {
 checkMove(curPiece, curX, curY - 1);
 } else if (e.keyCode === 8) {
 addTrash();
 }
 }*/

$(function () {
    $('#left').click(function () {
        checkMove(curPiece, curX - 1, curY);
    });

    $('#right').click(function () {
        checkMove(curPiece, curX + 1, curY);
    });
    $('#drop-down').click(function () {
        jump();
    });

    $('#rotate').click(function () {
        curPiece = rotateRight(curPiece);
        checkMove(curPiece, curX, curY);
    });

    game();
});
