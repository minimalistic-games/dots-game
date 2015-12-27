var Graph = require('./graph');

var Field = function (view, cellSize) {
    this.view = view;
    this.cellSize = cellSize;
    this.players = this.initPlayers();
};

Field.prototype.minCellSize = 10;
Field.prototype.maxCellSize = 100;
Field.prototype.nextPlayer = 'red';

Field.prototype.initPlayers = function () {
    return {'red': [new Graph()],
            'blue': [new Graph()]};
};

Field.prototype.load = function () {
    var playersData = JSON.parse(localStorage.getItem('players'));
    var graphFromData = function (graphData) {
        return new Graph(graphData);
    };

    if (playersData) {
        for (var player in playersData) {
            this.players[player] = playersData[player].map(graphFromData);
        }
    } else {
        this.players = this.initPlayers();
    }

    this.nextPlayer = this.getPlayerDotsNumber('red') > this.getPlayerDotsNumber('blue') ? 'blue'
                                                                                         : 'red';
};

Field.prototype.save = function () {
    var playersData = {};
    var dataFromGraph = function (graph) {
        return Array.from(graph.dots);
    };

    for (var player in this.players) {
        playersData[player] = this.players[player].map(dataFromGraph);
    }

    localStorage.setItem('players', JSON.stringify(playersData));
};

Field.prototype.getPlayerDotsNumber = function (player) {
    return this.players[player].reduce(function (sum, graph) {
        return sum + graph.dots.size;
    }, 0);
};

Field.prototype.render = function () {
    this.view.clear();
    this.drawGrid();
    this.drawDots();
};

Field.prototype.subscribe = function () {
    document.addEventListener('keydown', this.clearOnKeyDown.bind(this));

    this.view.listenTo('wheel', this.zoomOnScroll.bind(this));
    this.view.listenTo('mousemove', this.drawDotPlaceholderOnMouseMove.bind(this));
    this.view.listenTo('click', this.placeDotOnClick.bind(this));
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
    }, this);

    this.view.drawStrokeRect([0, 0],
                             dimensions);
};

Field.prototype.drawDots = function () {
    for (var player in this.players) {
        this.drawPlayerDots(player);
    }
};

Field.prototype.drawPlayerDots = function (player) {
    var playerColor = this.view.getColor(player, 1);

    this.players[player].forEach(function (graph) {
        for (var coords of graph.dots) {
            this.view.drawDot(playerColor,
                              this.cellSize,
                              coords);
        }
    }, this);
};

Field.prototype.clearOnKeyDown = function (e) {
    if (!e.altKey || e.keyCode !== 67) { return; }

    this.players = this.initPlayers();
    this.nextPlayer = 'red';
    this.save();
    this.render();
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
    var linesIntersection = this.getClosestGridLinesIntersection([e.offsetX,
                                                                  e.offsetY]);

    this.render();

    if (linesIntersection && !this.hasDot(linesIntersection)) {
        this.view.drawDot(this.view.getColor(this.nextPlayer, 0.6),
                          this.cellSize,
                          linesIntersection);
    }
};

Field.prototype.placeDotOnClick = function (e) {
    var linesIntersection = this.getClosestGridLinesIntersection([e.offsetX,
                                                                  e.offsetY]);

    if (linesIntersection && !this.hasDot(linesIntersection)) {
        this.placeDot(linesIntersection);
        this.nextPlayer = this.nextPlayer == 'red' ? 'blue' : 'red';
        this.render();
        this.save();
    }
};

Field.prototype.hasDot = function (coords) {
    var equals = function (dot) {
        return dot[0] === coords[0] &&
               dot[1] === coords[1];
    };

    for (var player in this.players) {
        var playerGraphs = this.players[player];

        for (var graphIndex in playerGraphs) {
            if (Array.from(playerGraphs[graphIndex].dots).find(equals)) {
                return true;
            }
        }
    }

    return false;
};

Field.prototype.placeDot = function (coords) {
    var playerGraphs = this.players[this.nextPlayer];

    for (var graphIndex in playerGraphs) {
        var graph = playerGraphs[graphIndex];

        if (graph.isNear(coords)) {
            graph.add(coords);
            // todo: check other graphs and merge if current dot connects those
            return;
        }
    }

    var newGraph = new Graph();

    newGraph.add(coords);
    playerGraphs.push(newGraph);
};

Field.prototype.getClosestGridLinesIntersection = function (coords) {
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
    }, this);

    return closest[0] !== undefined && closest[1] !== undefined ? closest
                                                                : null;
};

module.exports = Field;
