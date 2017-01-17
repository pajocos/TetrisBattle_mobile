var CANVAS_WIDTH = 320;
var CANVAS_HEIGHT = 640;
var PIECE_SIZE;

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
    PIECE_SIZE = CANVAS_WIDTH * 0.1;

    drawBackground();

    /*if (screen.width * 2 > screen.height * 0.75) {
     canvas.width = (screen.height * 0.75) / 2;
     canvas.height = screen.height;
     console.log(canvas.width + " " + canvas.height);
     }
     else {
     canvas.width = screen.width;
     canvas.height = screen.width * 2;
     }*/

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
        g.fillRect(x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE, PIECE_SIZE, PIECE_SIZE);
    }

    for (var i = 0; i < 4; i++) {
        var x = curX + getX(curPiece, i);
        var y = curY - getY(curPiece, i);
        g.beginPath();
        g.strokeStyle = "black";
        g.moveTo(x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        g.lineTo(x * PIECE_SIZE + PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        g.lineTo(x * PIECE_SIZE + PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE + PIECE_SIZE);
        g.lineTo(x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE + PIECE_SIZE);
        g.lineTo(x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        g.stroke();
        g.closePath();
        var shape = curPiece.pieceShape;
        if (shape === "ZShape")
            g.drawImage(darkBlue, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        else if (shape === "SShape")
            g.drawImage(green, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        else if (shape === "LineShape")
            g.drawImage(lightBlue, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        else if (shape === "TShape")
            g.drawImage(purple, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        else if (shape === "SquareShape")
            g.drawImage(red, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        else if (shape === "LShape")
            g.drawImage(orange, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
        else if (shape === "MirroredLShape")
            g.drawImage(yellow, x * PIECE_SIZE, (BOARD_HEIGHT - y - 1) * PIECE_SIZE);
    }

    for (var y = 0; y < 20; y++) {
        for (var x = 0; x < 10; x++) {
            var shape = pieceAt(x, BOARD_HEIGHT - y - 1);
            if (shape === "ZShape")
                g.drawImage(darkBlue, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "SShape")
                g.drawImage(green, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "LineShape")
                g.drawImage(lightBlue, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "TShape")
                g.drawImage(purple, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "SquareShape")
                g.drawImage(red, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "LShape")
                g.drawImage(orange, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "MirroredLShape")
                g.drawImage(yellow, x * PIECE_SIZE, y * PIECE_SIZE);
            else if (shape === "Trash")
                g.drawImage(trash, x * PIECE_SIZE, y * PIECE_SIZE);

            if (shape != "NoShape") {
                g.beginPath();
                g.strokeStyle = "black";
                g.moveTo(x * PIECE_SIZE, y * PIECE_SIZE);
                g.lineTo(x * PIECE_SIZE + PIECE_SIZE, y * PIECE_SIZE);
                g.lineTo(x * PIECE_SIZE + PIECE_SIZE, y * PIECE_SIZE + PIECE_SIZE);
                g.lineTo(x * PIECE_SIZE, y * PIECE_SIZE + PIECE_SIZE);
                g.lineTo(x * PIECE_SIZE, y * PIECE_SIZE);
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
        sound_PieceMoveLR.play();
    });

    $('#right').click(function () {
        checkMove(curPiece, curX + 1, curY);
        sound_PieceMoveLR.play();
    });
    $('#drop-down').click(function () {
        jump();
        sound_PieceDrop.play();
    });

    $('#rotate').click(function () {
        curPiece = rotateRight(curPiece);
        checkMove(curPiece, curX, curY);
        sound_PieceRot.play();
    });

    $('#down').click(function () {
        checkMove(curPiece, curX, curY - 1);
        sound_PieceDown.play();
    });

    game();
});
