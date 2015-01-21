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

Field.prototype.drawDotPlaceholderOnMouseMove = function (cell_size) {
    var self = this;

    this.ctx.canvas.addEventListener('mousemove', function (e) {
        var lines_intersection = self.getClosestLinesIntersection([e.offsetX,
                                                                   e.offsetY],
                                                                  cell_size);

        self.clear();
        self.drawGrid(cell_size);

        if (lines_intersection) {
            self.drawDotPlaceholder(lines_intersection, cell_size);
        }
    });
};

Field.prototype.getClosestLinesIntersection = function (coords, cell_size) {
    var tolerance = 0.2,
        closest = [];

    [0, 1].forEach(function (axis) {
        var relative = coords[axis] / cell_size,
            before = Math.floor(relative),
            after = Math.ceil(relative);

        if (relative - before < tolerance) {
            closest[axis] = before;
        } else if (after - relative < tolerance) {
            closest[axis] = after;
        }
    });

    return closest[0] !== undefined && closest[1] !== undefined ? closest
                                                                : null;
};

Field.prototype.drawDotPlaceholder = function (coords, cell_size) {
    ctx.beginPath();
    ctx.arc(coords[0] * cell_size,
            coords[1] * cell_size,
            6,
            0,
            2 * Math.PI,
            false);
    ctx.fillStyle = 'rgba(100, 120, 140, 0.8)';
    ctx.fill();
};

if (typeof module !== 'undefined' &&
    typeof module.exports !== 'undefined') {
    // node (to run mocha tests)
    module.exports = Field;
} else {
    // browser
    var ctx = document.getElementById('canvas').getContext('2d'),
        field = new Field(ctx),
        cell_size = 40;

    field.drawGrid(cell_size);
    field.drawDotPlaceholderOnMouseMove(cell_size);
}
