var board;
var curPiece;
var nextPiece;
var isFallingFinished = false;
var isStarted = false;
var score;
var curX = 0;
var curY = 0;

var shadowX;
var shadowY;

var points = 0;

var animationInterval = null;

var BOARD_WIDTH = 10;
var BOARD_HEIGHT = 20;

function Engine() {
    curPiece = new Shape();
    nextPiece = new Shape();
    setRandomShape(nextPiece);
    board = new Array(200);
    clearBoard();
}

function start() {
    isStarted = true;
    isFallingFinished = false;
    score = 0;
    clearBoard();
    newPiece();
    startAnimationTimer();
}

function startAnimationTimer() {
    if (animationInterval === null) {
        animationInterval = setInterval(move, 300);
    }
}

function move() {
    if (isFallingFinished) {
        isFallingFinished = false;
        newPiece();
    } else {
        dropOneLine();
    }
}

function clearBoard() {
    for (var i = 0; i < 200; ++i)
        board[i] = "NoShape";
}

function pieceAt(x, y) {
    return board[(y * BOARD_WIDTH) + x];
}

function newPiece() {

    curPiece = nextPiece;
    nextPiece = new Shape();
    setRandomShape(nextPiece);

    curX = BOARD_WIDTH / 2;
    curY = BOARD_HEIGHT - 1 + minY(curPiece);

    if (!checkMove(curPiece, curX, curY)) {
        setShape(curPiece, "NoShape");
        clearInterval(animationInterval);
        isStarted = false;

        clearBoard();
        setShape(curPiece, "NoShape");
    }
}

function checkMove(newPiece, newX, newY) {
    for (var i = 0; i < 4; i++) {
        var x = newX + getX(newPiece, i);
        var y = newY - getY(newPiece, i);
        if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT)
            return false;
        if (pieceAt(x, y) != "NoShape")
            return false;
    }

    curPiece = newPiece;
    curX = newX;
    curY = newY;
    shadowX = newX;
    shadow();
    renderCanvas();
    return true;
}

function dropOneLine() {
    if (!checkMove(curPiece, curX, curY - 1))
        pieceDropped();
}

function pieceDropped() {
    for (var i = 0; i < 4; i++) {
        var x = curX + getX(curPiece, i);
        var y = curY - getY(curPiece, i);
        board[(y * BOARD_WIDTH) + x] = curPiece.pieceShape;
    }

    removeFullLines();

    if (!isFallingFinished) {
        newPiece();
    }
}

function jump() {
    var newY = curY;
    while (newY > 0) {
        if (!checkMove(curPiece, curX, newY - 1))
            break;
        --newY;
    }
    pieceDropped();
}

function posibleMove(newPiece, newX, newY) {
    for (var i = 0; i < 4; i++) {
        var x = newX + getX(newPiece, i);
        var y = newY - getY(newPiece, i);
        if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT)
            return false;
        if (pieceAt(x, y) != "NoShape")
            return false;
    }
    return true;
}

function shadow() {
    shadowY = curY;
    while (shadowY > 0) {
        if (!posibleMove(curPiece, shadowX, shadowY - 1))
            break;
        --shadowY;
    }
}

function addTrash() {
    var clone = board;
    for (var y = BOARD_HEIGHT - 1; y > 0; y--) {
        for (var x = 0; x < BOARD_WIDTH; x++) {

            board[(y * BOARD_WIDTH) + x] = clone[((y - 1) * BOARD_WIDTH) + x];

        }
    }

    for (var x = 0; x < BOARD_WIDTH; x++) {
        board[x] = "Trash";
    }

}

function removeFullLines() {
    var numFullLines = 0;

    for (var i = BOARD_HEIGHT - 1; i >= 0; --i) {
        var lineIsFull = true;

        for (var j = 0; j < BOARD_WIDTH; ++j) {
            if (pieceAt(j, i) == "NoShape" || pieceAt(j, i) == "Trash") {
                lineIsFull = false;
                break;
            }
        }

        if (lineIsFull) {
            ++numFullLines;
            for (var k = i; k < BOARD_HEIGHT - 1; ++k) {
                for (var j = 0; j < BOARD_WIDTH; ++j)
                    board[(k * BOARD_WIDTH) + j] = pieceAt(j, k + 1);
            }
        }
    }

    if (numFullLines > 0) {
        points += Math.pow(2, numFullLines);
        isFallingFinished = true;
        renderCanvas();
    }
}

/*
 * LINES PROTOCOL
 */

function sendLine(numLines) {
    socket.emit('send_line', {user: opponent, num: numLines});
}

socket.on('receive_line', function (data) {
    for (var i = 0; i < data.num; i++) {
        addTrash();
    }
});