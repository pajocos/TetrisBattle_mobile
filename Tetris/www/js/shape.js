var types = ["ZShape", "SShape", "LineShape", "TShape", "SquareShape", "LShape", "MirroredLShape"];
var colors = [
  "DarkSalmon" ,
  "LimeGreen",
  "MediumSlateBlue",
  "DarkKhaki",
  "IndianRed",
  "LightSkyBlue",
  "GoldenRod"
];

var pieces = [];
var coords = [];
var pieceShape = "NoShape";
var color;

function Shape() {
  setPieces();
  coords = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ];
  setShape(this, "NoShape");
}

function setPieces() {
  pieces["NoShape"] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ];
  pieces["ZShape"] = [
    [0, -1],
    [0, 0],
    [-1, 0],
    [-1, 1]
  ];
  pieces["SShape"] = [
    [0, -1],
    [0, 0],
    [1, 0],
    [1, 1]
  ];
  pieces["LineShape"] = [
    [0, -1],
    [0, 0],
    [0, 1],
    [0, 2]
  ];
  pieces["TShape"] = [
    [-1, 0],
    [0, 0],
    [1, 0],
    [0, 1]
  ];
  pieces["SquareShape"] = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
  ];
  pieces["LShape"] = [
    [-1, -1],
    [0, -1],
    [0, 0],
    [0, 1]
  ];
  pieces["MirroredLShape"] = [
    [1, -1],
    [0, -1],
    [0, 0],
    [0, 1]
  ];
}

function setShape(piece, shape) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 2; ++j) {
      coords[i][j] = pieces[shape][i][j];
    }
  }
  setCoords(piece, coords);
  piece.pieceShape = shape;
}

function setX(index, x) {
  coords[index][0] = x;
}

function setY(index, y) {
  coords[index][1] = y;
}

function getX(piece, index) {
  return piece.coords[index][0];
}

function getY(piece, index) {
  return piece.coords[index][1];
}

function getShape() {
  return pieceShape;
}

function setColor(piece, color) {
  piece.color = color;
}

function setCoords(piece, coords){
  piece.coords = coords;
}

function setRandomShape(piece) {
  var type = Math.floor(Math.random() * 7);
  setShape(piece, types[type]);
  setColor(piece, colors[type]);
}

function minY(piece) {
  var m = piece.coords[0][1];
  for (var i = 0; i < 4; i++) {
    m = Math.min(m, piece.coords[i][1]);
  }
  return m;
}

function rotateRight() {
  if (pieceShape == "SquareShape")
    return this;

  var result = new Shape();
  result.pieceShape = pieceShape;

  for (var i = 0; i < 4; ++i) {
    result.setX(i, -y(i));
    result.setY(i, x(i));
  }
  return result;
}
