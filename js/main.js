var Field = require('./field');

var field = new Field(document.querySelector('canvas').getContext('2d'),
                      40);

field.render();
field.subscribe();
