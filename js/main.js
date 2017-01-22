import View from './View';
import Field from './Field';

const view = new View(document.querySelector('canvas').getContext('2d'));
const cellSize = 40;
const field = new Field(view, cellSize);

field.load();
field.render();
field.subscribe();

// for debugging only
window.field = field;
