var board;
var curPiece;
var nextPiece;
var isFallingFinished = false;
var isStarted = false;
var score;
var curX = 0;
var curY = 0;

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
  console.log("Starting Game");
  isStarted = true;
  isFallingFinished = false;
  score = 0;
  clearBoard();
  newPiece();
  startAnimationTimer();
}

function startAnimationTimer() {
  if (animationInterval === null) {
    animationInterval = setInterval(move, 500);
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
  //	mainWindow.sidePanel.nextPieceG.nextPiece = nextPiece;

  //  mainWindow.sidePanel.nextPieceG.repaint();

  curX = BOARD_WIDTH / 2;
  curY = BOARD_HEIGHT - 1 + minY(curPiece);

  if (!checkMove(curPiece, curX, curY)) {
    setShape(curPiece, "NoShape");
    clearInterval(animationInterval);
    isStarted = false;

    /*    if (multiPlayer)
          mainWindow.peer.sendGameOver(0);
        else
          mainWindow.client.sendScore(
            mainWindow.sidePanel.txtUsername.getText(), score,
            false);
     */

    /*    JOptionPane.showMessageDialog(null, "Game Over " +
          mainWindow.engine.score + " points!\n\n" +
          mainWindow.client.getScores(multiPlayer));
        mainWindow.sidePanel.scoreBar.setText("game over");
        if (!multiPlayer)
          mainWindow.twitter.postToTwitter(score); */
    clearBoard();
    setShape(curPiece, "NoShape");
    //    mainWindow.sidePanel.showPlayerList();
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

  console.log("CURX: " + curX + " CURY: " + curY);

  g.drawImage(boardImg, 0, 0);
  for (var i = 0; i < 4; i++) {
    var x = curX + getX(curPiece, i);
    var y = curY - getY(curPiece, i);
    g.fillStyle = curPiece.color;
    g.fillRect(x * 32, (20 - y - 1) * 32, 32, 32);

  /*      drawSquare(g, 0 + x * squareWidth(), boardTop
            + (engine.BoardHeight - y - 1) * squareHeight(),
            engine.curPiece.getShape()); */
  }

  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 10; x++) {
      var shape = pieceAt(x,20 - y - 1);
      if (shape != "NoShape"){
        g.fillStyle = color;
        g.fillRect(x * 32, y * 32, 32, 32);
      }
    }
  }

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
    console.log("X: " + x + " Y: " + y);
    console.log((y * BOARD_WIDTH) + x);
    board[(y * BOARD_WIDTH) + x] = curPiece.pieceShape;
  }

  removeFullLines();

  if (!isFallingFinished) {
    newPiece();
  }
}

function removeFullLines() {
  var lines = [];
  for (var y = BOARD_HEIGHT - 1; y >= 0; y--) {
    lines.push(y);
    for (var x = 0; x < BOARD_WIDTH; x++) {
      if (pieceAt(x, y) == "NoShape" || pieceAt(x, y) == "Trash") {
        var index = lines.indexOf(y);
        if (index > -1) {
          lines.splice(index, 1);
        }
        break;
      }
    }
  }
  var clone = board;
  for (var k = 0; k < lines.length; k++) {
    clone = board;
    console.log(lines[k]);
    for (var y = lines[k]; y < BOARD_HEIGHT - 1; y++) {
      for (var x = 0; x < BOARD_WIDTH; x++) {
        board[(y * BOARD_WIDTH) + x] = clone[((y + 1) * BOARD_WIDTH) + x];
      }
    }
  }

  if (lines.length > 0) {
    var numLines = lines.length;
    /*  Thread sendLineT = new Thread(new Runnable() {

        public void run() {
          if (multiPlayer)
            mainWindow.peer.sendLine(numLines, 0);
        }
      });
      sendLineT.start();

      score += lines.size() * lines.size() * 100;
      mainWindow.sidePanel.scoreBar.setText(String.valueOf(score)); */
    isFallingFinished = true;
    setShape(curPiece, "NoShape");
  }
}
