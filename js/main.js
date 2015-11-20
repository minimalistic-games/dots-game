var Field = require('./field');

var ctx = document.querySelector('canvas').getContext('2d');
var field = new Field(ctx);
var cellSize = 40;

field.drawGrid(cellSize);
field.drawDotPlaceholderOnMouseMove(cellSize);
