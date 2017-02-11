import 'hidpi-canvas/dist/hidpi-canvas.min';

import './app.css';

import Matrix from './classes/Matrix';
import View from './classes/View';
import Field from './classes/Field';

const matrix = new Matrix();
const view = new View(document.querySelector('canvas').getContext('2d'));
const cellSize = 40;

const field = new Field(matrix, view, cellSize);

field.load();
field.render();
field.subscribe();

// for debugging only
window.field = field;
