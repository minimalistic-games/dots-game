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

Field.prototype.drawGrid = function (cellSize) {
    [0, 1].forEach(function (axis) {
        var size = this.ctx.canvas[axis ? 'height' : 'width'];
        var lines = Math.floor(size / cellSize);
        var offset;
        var from;
        var to;

        for (var i = 0; i <= lines; i++) {
            offset = i * cellSize;
            from = [0, offset];
            to = [size, offset];
            this.drawLine(axis ? from.reverse() : from,
                          axis ? to.reverse() : to);
        }
    }.bind(this));
};

Field.prototype.drawDotPlaceholderOnMouseMove = function (cellSize) {
    this.ctx.canvas.addEventListener('mousemove', function (e) {
        var linesIntersection = this.getClosestLinesIntersection([e.offsetX,
                                                                  e.offsetY],
                                                                 cellSize);

        this.clear();
        this.drawGrid(cellSize);

        if (linesIntersection) {
            this.drawDotPlaceholder(linesIntersection, cellSize);
        }
    }.bind(this));
};

Field.prototype.getClosestLinesIntersection = function (coords, cellSize) {
    var tolerance = 0.2;
    var closest = [];

    [0, 1].forEach(function (axis) {
        var relative = coords[axis] / cellSize;
        var before = Math.floor(relative);
        var after = Math.ceil(relative);

        if (relative - before < tolerance) {
            closest[axis] = before;
        } else if (after - relative < tolerance) {
            closest[axis] = after;
        }
    });

    return closest[0] !== undefined && closest[1] !== undefined ? closest
                                                                : null;
};

Field.prototype.drawDotPlaceholder = function (coords, cellSize) {
    this.ctx.beginPath();
    this.ctx.arc(coords[0] * cellSize,
                 coords[1] * cellSize,
                 8,
                 0,
                 2 * Math.PI,
                 false);
    this.ctx.fillStyle = 'rgba(100, 120, 140, 0.8)';
    this.ctx.fill();
};

module.exports = Field;
