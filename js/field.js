var Field = function (view, cellSize) {
    this.view = view;

    this.cellSize = cellSize;
    this.minCellSize = 10;
    this.maxCellSize = 100;

    this.dots = [];
};

Field.prototype.render = function () {
    this.view.clear();
    this.drawGrid();
    this.drawDots();
};

Field.prototype.subscribe = function () {
    this.view.listenTo('wheel', this.zoomOnScroll.bind(this));
    this.view.listenTo('mousemove', this.drawDotPlaceholderOnMouseMove.bind(this));
    this.view.listenTo('click', this.placeDotOnClick.bind(this));
};

Field.prototype.hasDot = function (coords) {
    var equals = function (dot) {
        return dot[0] === coords[0] &&
               dot[1] === coords[1];
    };

    return Boolean(this.dots.find(equals));
};

Field.prototype.drawGrid = function () {
    var dimensions = this.view.getDimensions();

    [0, 1].forEach(function (axis) {
        var size = dimensions[axis];
        var lines = Math.floor(size / this.cellSize);

        for (var i = 0; i <= lines; i++) {
            var offset = i * this.cellSize;
            var from = [0, offset];
            var to = [size, offset];

            this.view.drawLine(axis ? from.reverse() : from,
                               axis ? to.reverse() : to);
        }
    }.bind(this));
};

Field.prototype.drawDots = function () {
    this.dots.forEach(this.view.drawDot.bind(this.view,
                                             '#c20',
                                             this.cellSize));
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

    if (linesIntersection && !this.hasDot(linesIntersection)) {
        this.view.drawDot('rgba(100, 120, 140, 0.8)',
                          this.cellSize,
                          linesIntersection);
    }
};

Field.prototype.placeDotOnClick = function (e) {
    var linesIntersection = this.getClosestLinesIntersection([e.offsetX,
                                                              e.offsetY]);

    if (linesIntersection && !this.hasDot(linesIntersection)) {
        this.dots.push(linesIntersection);
        this.render();
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

module.exports = Field;
