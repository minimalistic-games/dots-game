import View from './view';
import Field from './field';

const field = new Field(
    new View(document.querySelector('canvas').getContext('2d')),
    40
);

field.load();
field.render();
field.subscribe();

// for debugging only
window.field = field;
