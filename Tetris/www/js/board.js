var CANVAS_WIDTH = 350;
var CANVAS_HEIGHT = 650;

var canvas;
var g;

var boardImg = new Image();
boardImg.src = "../img/board.png";

window.onload = onAllAssetsLoaded;
document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded()
{
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
    renderCanvas();
}

function renderCanvas() {
  g.drawImage(boardImg, 0, 0);
}

function keydownHandler(e)
{
    if (e.keyCode === 13)  // NUMPAD ENTER
    {
      start();
    }
    else if (e.keyCode === 32) // spacebar
    {
      jump(curPiece);
    }
    else if (e.keyCode === 37) // left
    {
      checkMove(curPiece, curX - 1, curY);
    }
    else if (e.keyCode === 38) // up
    {
      curPiece = rotateRight(curPiece);
      checkMove(curPiece, curX, curY);
    }
    else if (e.keyCode === 39) // right
    {
      checkMove(curPiece, curX + 1, curY);
    }
}
