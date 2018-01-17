import { getColorCode } from 'src/utils';
import config from 'src/config';

export default class Field {
  constructor(matrix, view, cellSize) {
    this.matrix = matrix;
    this.view = view;
    this.cellSize = cellSize;

    this.nextPlayer = config.firstPlayer;
  }

  load() {
    this.matrix.preset(JSON.parse(localStorage.getItem('matrix')));
    const dotsNumbers = this.matrix.countDots();
    this.nextPlayer = dotsNumbers.red > dotsNumbers.blue ? 'blue' : 'red';
  }

  save() {
    localStorage.setItem('matrix', JSON.stringify(this.matrix.spots));
  }

  render() {
    this.view.clear();
    this.drawGrid();
    this.drawDots();
    this.drawZones();
  }

  subscribe() {
    document.addEventListener('keydown', this.clearOnKeyDown.bind(this));

    this.view.listenTo('wheel', this.zoomOnScroll.bind(this));
    this.view.listenTo('mousemove', this.drawDotPlaceholderOnMouseMove.bind(this));
    this.view.listenTo('click', this.placeDotOnClick.bind(this));
  }

  drawGrid() {
    const dimensions = this.view.getDimensions();
    const colorCode = getColorCode('white', 0.6);

    [0, 1].forEach((axis) => {
      const size = dimensions[axis];
      const lines = Math.floor(size / this.cellSize);

      for (let i = 0; i <= lines; i += 1) {
        const offset = i * this.cellSize;
        const from = [0, offset];
        const to = [size, offset];

        this.view.drawLine(
          colorCode,
          i % 5,
          1,
          axis ? from.reverse() : from,
          axis ? to.reverse() : to,
        );
      }
    });

    this.view.drawStrokeRect([0, 0], dimensions);
  }

  drawDots() {
    const colorCodes = {
      red: getColorCode('red', 1),
      blue: getColorCode('blue', 1),
    };

    const dotRadius = this.getDotRadius();

    this.matrix.getAllDots().forEach(({ coords, color }) => {
      this.view.drawDot(
        colorCodes[color],
        dotRadius,
        coords.map(this.scaleCoord, this),
      );

      this.view.drawDotCoords(
        colorCodes[color],
        dotRadius,
        coords.map(this.scaleCoord, this),
        coords,
      );
    });
  }

  drawZones() {
    const lineWidth = this.getLineWidth();
    const drawLine = (colorCode, a, b) => {
      this.view.drawLine(
        colorCode,
        false,
        lineWidth,
        a.coords.map(this.scaleCoord, this),
        b.coords.map(this.scaleCoord, this),
      );
    };

    ['red', 'blue'].forEach((color) => {
      const colorCode = getColorCode(color, 0.6);

      this.matrix.zones[color].forEach((zone) => {
        for (let i = 1; i < zone.length; i += 1) {
          drawLine(colorCode, zone[i - 1], zone[i]);
        }

        drawLine(colorCode, zone[zone.length - 1], zone[0]);
      });
    });
  }

  scaleCoord(coord) {
    return coord * this.cellSize;
  }

  getDotRadius() {
    return Math.max(this.cellSize / 8, 2);
  }

  getLineWidth() {
    return Math.max(this.cellSize / 16, 2);
  }

  clearOnKeyDown(e) {
    // Alt+C
    if (!e.altKey || e.keyCode !== 67) {
      return;
    }

    this.matrix.reset();
    this.nextPlayer = config.firstPlayer;
    this.render();
    this.save();
  }

  zoomOnScroll(e) {
    if (!e.deltaY) {
      return;
    }

    const newCellSize = this.cellSize * (1 - 0.05 * Math.sign(e.deltaY));

    if (newCellSize > config.minCellSize && newCellSize < config.maxCellSize) {
      this.cellSize = newCellSize;
      this.render();
    }
  }

  drawDotPlaceholderOnMouseMove(e) {
    const linesIntersection = this.getClosestGridLinesIntersection([e.offsetX, e.offsetY]);

    this.render();

    if (linesIntersection && !this.matrix.getDot(linesIntersection)) {
      this.view.drawDot(
        getColorCode(this.nextPlayer, 0.6),
        this.getDotRadius(),
        linesIntersection.map(this.scaleCoord, this),
      );
    }
  }

  placeDotOnClick(e) {
    const linesIntersection = this.getClosestGridLinesIntersection([e.offsetX, e.offsetY]);

    if (linesIntersection && !this.matrix.getDot(linesIntersection)) {
      const dot = this.matrix.placeDot(linesIntersection, this.nextPlayer);
      this.matrix.addDotToZones(dot);
      this.nextPlayer = this.nextPlayer === 'red' ? 'blue' : 'red';
      this.render();
      this.save();
    }
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
