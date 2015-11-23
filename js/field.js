var Field = function (ctx, cellSize) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;

    this.cellSize = cellSize;
    this.minCellSize = 10;
    this.maxCellSize = 100;
};

Field.prototype.render = function () {
    this.clear();
    this.drawGrid();
};

Field.prototype.subscribe = function () {
    this.ctx.canvas.addEventListener('wheel', this.zoomOnScroll.bind(this));
    this.ctx.canvas.addEventListener('mousemove', this.drawDotPlaceholderOnMouseMove.bind(this));
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

Field.prototype.drawGrid = function () {
    [0, 1].forEach(function (axis) {
        var size = this.ctx.canvas[axis ? 'height' : 'width'];
        var lines = Math.floor(size / this.cellSize);

        for (var i = 0; i <= lines; i++) {
            var offset = i * this.cellSize;
            var from = [0, offset];
            var to = [size, offset];

            this.drawLine(axis ? from.reverse() : from,
                          axis ? to.reverse() : to);
        }
    }.bind(this));
};

Field.prototype.zoomOnScroll = function (e) {
    if (!e.deltaY) { return; }

    var newCellSize = this.cellSize * (1 - 0.05 * Math.sign(e.deltaY)) ;

    if (newCellSize > this.minCellSize && newCellSize < this.maxCellSize) {
        this.cellSize = newCellSize;
        this.render();
    }
};

Field.prototype.drawDotPlaceholderOnMouseMove = function (e) {
    var linesIntersection = this.getClosestLinesIntersection([e.offsetX,
                                                              e.offsetY]);

    this.render();

    if (linesIntersection) {
        this.drawDotPlaceholder(linesIntersection);
    }
};

Field.prototype.getClosestLinesIntersection = function (coords) {
    var tolerance = 0.2;
    var closest = [];

    [0, 1].forEach(function (axis) {
        var relative = coords[axis] / this.cellSize;
        var before = Math.floor(relative);
        var after = Math.ceil(relative);

        if (relative - before < tolerance) {
            closest[axis] = before;
        } else if (after - relative < tolerance) {
            closest[axis] = after;
        }
    }.bind(this));

    return closest[0] !== undefined && closest[1] !== undefined ? closest
                                                                : null;
};

Field.prototype.drawDotPlaceholder = function (coords) {
    this.ctx.beginPath();
    this.ctx.arc(coords[0] * this.cellSize,
                 coords[1] * this.cellSize,
                 Math.max(this.cellSize / 5, 4),
                 0,
                 2 * Math.PI,
                 false);
    this.ctx.fillStyle = 'rgba(100, 120, 140, 0.8)';
    this.ctx.fill();
};

module.exports = Field;
