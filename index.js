var Field = function (ctx) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;
};

Field.prototype.clear = function () {
    this.ctx.clearRect(0,
                       0,
                       this.ctx.canvas.width,
                       this.ctx.canvas.height);
};

Field.prototype.drawLine = function (from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from[0], from[1]);
    this.ctx.lineTo(to[0], to[1]);
    this.ctx.stroke();
};

Field.prototype.drawGrid = function (cell_size) {
    var self = this;

    [0, 1].forEach(function (axis) {
        var size = self.ctx.canvas[axis ? 'height' : 'width'],
            lines = Math.floor(size / cell_size),
            offset,
            from,
            to;

        for (var i = 0; i <= lines; i++) {
            offset = i * cell_size;
            from = [0, offset];
            to = [size, offset];
            self.drawLine(axis ? from.reverse() : from,
                          axis ? to.reverse() : to);
        }
    });
};

if (typeof module !== 'undefined' &&
    typeof module.exports !== 'undefined') {
    // node (to run mocha tests)
    module.exports = Field;
} else {
    // browser
    var ctx = document.getElementById('canvas').getContext('2d'),
        field = new Field(ctx);

    field.drawGrid(40);
}
