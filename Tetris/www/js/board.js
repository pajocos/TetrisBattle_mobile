var CANVAS_WIDTH = 350;
var CANVAS_HEIGHT = 650;

var canvas;
var g;

var boardImg = new Image();
boardImg.src = "../img/board.png";

window.onload = onAllAssetsLoaded;
document.write("<div id='loadingMessage'>Loading...</div>");

function onAllAssetsLoaded() {
  // hide the webpage loading message
  document.getElementById('loadingMessage').style.visibility = "hidden";

  /* associate the javascript canvas variable to the HTML canvas element  */
  canvas = document.getElementById("canvas");

  /* Assign a graphics context to the canvas, so that we can draw on it */
  g = canvas.getContext("2d");

  /* Give the canvas a width and height */
  /* The width and height are in canvas logical units */
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  document.addEventListener('keydown', keydownHandler);

  var engine = new Engine();
  drawBackground();
}

function drawBackground() {
  g.drawImage(boardImg, 0, 0);
}

function renderCanvas() {
  g.drawImage(boardImg, 0, 0);
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
    g.fillStyle = curPiece.color;
    g.fillRect(x * 32, (BOARD_HEIGHT - y - 1) * 32, 32, 32);
  }

  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 10; x++) {
      var shape = pieceAt(x, BOARD_HEIGHT - y - 1);
      var color;
      if (shape === "ZShape")
        color = "DarkSalmon";
      else if (shape === "SShape")
        color = "LimeGreen";
      else if (shape === "LineShape")
        color = "MediumSlateBlue";
      else if (shape === "TShape")
        color = "DarkKhaki";
      else if (shape === "SquareShape")
        color = "IndianRed";
      else if (shape === "LShape")
        color = "LightSkyBlue";
      else if (shape === "MirroredLShape")
        color = "GoldenRod";

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
        g.fillStyle = color;
        g.fillRect(x * 32, y * 32, 32, 32);
      }
    }
  }
}

function keydownHandler(e) {
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
  }
}
