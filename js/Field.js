import { forOwn, some } from 'lodash';

import Graph from './Graph';

export default class Field {
  constructor(view, cellSize) {
    this.view = view;
    this.cellSize = cellSize;
    this.players = this.constructor.initPlayers();
    this.minCellSize = 10;
    this.maxCellSize = 100;
    this.nextPlayer = 'red';
  }

  static initPlayers() {
    return {
      red: new Set(),
      blue: new Set()
    };
  }

  load() {
    const storedPlayers = JSON.parse(localStorage.getItem('players'));

    if (storedPlayers) {
      forOwn(storedPlayers, (playerData, playerColor) => {
        this.players[playerColor] = new Set(playerData.map((graphData) => new Graph(graphData)));
      });
    }

    this.nextPlayer = this.getPlayerDotsNumber('red') > this.getPlayerDotsNumber('blue')
      ? 'blue'
      : 'red';
  }

  save() {
    const playersToStore = {};

    forOwn(this.players, (playerData, playerColor) => {
      playersToStore[playerColor] = Array.from(playerData).map((graph) => Array.from(graph.dots));
    });

    localStorage.setItem('players', JSON.stringify(playersToStore));
  }

  getPlayerDotsNumber(player) {
    let dotsNumber = 0;

    for (const graph of this.players[player]) {
      dotsNumber += graph.dots.size;
    }

    return dotsNumber;
  }

  render() {
    this.view.clear();
    this.drawGrid();
    this.drawDots();
    this.drawLines();
  }

  subscribe() {
    document.addEventListener('keydown', this.clearOnKeyDown.bind(this));

    this.view.listenTo('wheel', this.zoomOnScroll.bind(this));
    this.view.listenTo('mousemove', this.drawDotPlaceholderOnMouseMove.bind(this));
    this.view.listenTo('click', this.placeDotOnClick.bind(this));
  }

  drawGrid() {
    const dimensions = this.view.getDimensions();
    const colorCode = this.view.getColorCode('black', 0.8);

    [0, 1].forEach((axis) => {
      const size = dimensions[axis];
      const lines = Math.floor(size / this.cellSize);

      for (let i = 0; i <= lines; i += 1) {
        const offset = i * this.cellSize;
        const from = [0, offset];
        const to = [size, offset];

        this.view.drawLine(
          colorCode,
          false,
          1,
          axis ? from.reverse() : from,
          axis ? to.reverse() : to
        );
      }
    });

    this.view.drawStrokeRect([0, 0], dimensions);
  }

  drawDots() {
    forOwn(this.players, this.drawPlayerDots.bind(this));
  }

  drawLines() {
    forOwn(this.players, this.drawPlayerLines.bind(this));
  }

  drawPlayerDots(graphs, color) {
    const colorCode = this.view.getColorCode(color, 1);

    for (const graph of graphs) {
      for (const coords of graph.dots) {
        this.view.drawDot(
          colorCode,
          this.getDotRadius(),
          coords.map(this.scaleCoord, this)
        );
      }
    }
  }

  drawPlayerLines(graphs, color) {
    const colorCode = this.view.getColorCode(color, 0.8);

    for (const graph of graphs) {
      for (const line of graph.lines) {
        const dots = Array.from(line);

        this.view.drawLine(
          colorCode,
          true,
          2,
          dots[0].map(this.scaleCoord, this),
          dots[1].map(this.scaleCoord, this)
        );
      }
    }
  }

  scaleCoord(coord) {
    return coord * this.cellSize;
  }

  getDotRadius() {
    return Math.max(this.cellSize / 5, 4);
  }

  clearOnKeyDown(e) {
    // Alt+C
    if (!e.altKey || e.keyCode !== 67) { return; }

    this.players = this.constructor.initPlayers();
    this.nextPlayer = 'red';
    this.save();
    this.render();
  }

  zoomOnScroll(e) {
    if (!e.deltaY) { return; }

    const newCellSize = this.cellSize * (1 - 0.05 * Math.sign(e.deltaY));

    if (newCellSize > this.minCellSize && newCellSize < this.maxCellSize) {
      this.cellSize = newCellSize;
      this.render();
    }
  }

  drawDotPlaceholderOnMouseMove(e) {
    const linesIntersection = this.getClosestGridLinesIntersection([e.offsetX, e.offsetY]);

    this.render();

    if (linesIntersection && !this.hasDot(linesIntersection)) {
      this.view.drawDot(
        this.view.getColorCode(this.nextPlayer, 0.6),
        this.getDotRadius(),
        linesIntersection.map(this.scaleCoord, this)
      );
    }
  }

  placeDotOnClick(e) {
    const linesIntersection = this.getClosestGridLinesIntersection([e.offsetX, e.offsetY]);

    if (linesIntersection && !this.hasDot(linesIntersection)) {
      this.placeDot(linesIntersection);
      this.nextPlayer = this.nextPlayer === 'red' ? 'blue' : 'red';
      this.render();
      this.save();
    }
  }

  hasDot(coords) {
    function equals(dot) {
      return dot[0] === coords[0] && dot[1] === coords[1];
    }

    return some(this.players, (graphs) => {
      for (const graph of graphs) {
        if (Array.from(graph.dots).find(equals)) {
          return true;
        }
      }

      return false;
    });
  }

  placeDot(coords) {
    const playerGraphs = this.players[this.nextPlayer];
    const relatedGraphs = new Set();

    for (const graph of playerGraphs) {
      if (graph.isRelated(coords)) {
        relatedGraphs.add(graph);
      }
    }

    if (!relatedGraphs.size) {
      const newGraph = new Graph();
      newGraph.add(coords);
      playerGraphs.add(newGraph);
      return;
    }

    if (relatedGraphs.size === 1) {
      Array.from(relatedGraphs)[0].add(coords);
      return;
    }

    for (const relatedGraph of relatedGraphs) {
      playerGraphs.delete(relatedGraph);
    }

    const mergedGraph = Graph.merge(relatedGraphs);
    mergedGraph.add(coords);
    playerGraphs.add(mergedGraph);
  }

  getClosestGridLinesIntersection(coords) {
    const tolerance = 0.2;
    const closest = [];

    [0, 1].forEach((axis) => {
      const relative = coords[axis] / this.cellSize;
      const before = Math.floor(relative);
      const after = Math.ceil(relative);

      if (relative - before < tolerance) {
        closest[axis] = before;
      } else if (after - relative < tolerance) {
        closest[axis] = after;
      }
    });

    return closest[0] !== undefined && closest[1] !== undefined
      ? closest
      : null;
  }
}
