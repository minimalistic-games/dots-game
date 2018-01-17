import 'hidpi-canvas/dist/hidpi-canvas.min';

import config from 'src/config';

import Matrix from 'src/classes/Matrix';
import View from 'src/classes/View';
import Field from 'src/classes/Field';

import 'src/app.css';

const matrix = new Matrix();
const view = new View(document.querySelector('canvas').getContext('2d'));
const cellSize = config.cellSize.default;

const field = new Field(matrix, view, cellSize);

field.load();
field.render();
field.subscribe();

// for debugging only
window.field = field;
