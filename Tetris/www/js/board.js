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

var one = new Image();
one.src = "img/1.png";

var two = new Image();
two.src = "img/2.png";

var three = new Image();
three.src = "img/3.png";

var bomb = new Image();
bomb.src = "img/Bomb.png";

function game() {

    canvas = document.getElementById("canvas");

    g = canvas.getContext("2d");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    PIECE_SIZE = CANVAS_WIDTH * 0.1;

    /*if (screen.width * 2 > screen.height * 0.75) {
     canvas.width = (screen.height * 0.75) / 2;
     canvas.height = screen.height;
     console.log(canvas.width + " " + canvas.height);
     }
     else {
     canvas.width = screen.width;
     canvas.height = screen.width * 2;
     }*/

    new Engine();
    start();
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
            else if (shape === "Bomb")
                g.drawImage(bomb, x * PIECE_SIZE, y * PIECE_SIZE);

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

function drawCount(count) {
    g.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    switch (count) {
        case 1:
            g.drawImage(one, CANVAS_WIDTH / 2 - 35, CANVAS_HEIGHT / 2 - 60);
            break;
        case 2:
            g.drawImage(two, CANVAS_WIDTH / 2 - 35, CANVAS_HEIGHT / 2 - 60);
            break;
        case 3:
            g.drawImage(three, CANVAS_WIDTH / 2 - 35, CANVAS_HEIGHT / 2 - 60);
            break;
        default:
    }
}

$(function () {
    $('#left').click(function () {
        if (isStarted) {
            checkMove(curPiece, curX - 1, curY);
            playSoundByName('sound_PieceMoveLR');
        }
    });

    $('#right').click(function () {
        if (isStarted) {
            checkMove(curPiece, curX + 1, curY);
            playSoundByName('sound_PieceMoveLR');
        }
    });
    $('#drop-down').click(function () {
        if (isStarted) {
            jump();
            playSoundByName('sound_PieceDrop');
        }
    });

    $('#rotate').click(function () {
        if (isStarted) {
            checkMove(rotateRight(curPiece), curX, curY);
            playSoundByName('sound_PieceRot');
        }
    });

    $('#down').click(function () {
        if (isStarted) {
            checkMove(curPiece, curX, curY - 1);
            playSoundByName('sound_PieceDown');
        }
    });
    game();
});
