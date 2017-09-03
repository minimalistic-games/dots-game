export default class Field {
  constructor(matrix, view, cellSize) {
    this.matrix = matrix;
    this.view = view;

    this.cellSize = cellSize;
    this.minCellSize = 10;
    this.maxCellSize = 100;

    this.nextPlayer = 'red';
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
  }

  subscribe() {
    document.addEventListener('keydown', this.clearOnKeyDown.bind(this));

    this.view.listenTo('wheel', this.zoomOnScroll.bind(this));
    this.view.listenTo('mousemove', this.drawDotPlaceholderOnMouseMove.bind(this));
    this.view.listenTo('click', this.placeDotOnClick.bind(this));
  }

  drawGrid() {
    const dimensions = this.view.getDimensions();
    const colorCode = this.view.getColorCode('white', 0.6);

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
          axis ? to.reverse() : to
        );
      }
    });

    this.view.drawStrokeRect([0, 0], dimensions);
  }

  drawDots() {
    const colorCodes = {
      red: this.view.getColorCode('red', 1),
      blue: this.view.getColorCode('blue', 1)
    };

    const dotRadius = this.getDotRadius();

    this.matrix.getDots().forEach(({ coords, color }) => this.view.drawDot(
      colorCodes[color],
      dotRadius,
      coords.map(this.scaleCoord, this)
    ));
  }

  scaleCoord(coord) {
    return coord * this.cellSize;
  }

  getDotRadius() {
    return Math.max(this.cellSize / 8, 2);
  }

  clearOnKeyDown(e) {
    // Alt+C
    if (!e.altKey || e.keyCode !== 67) { return; }

    this.matrix.reset();
    this.nextPlayer = 'red';
    this.render();
    this.save();
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

    if (linesIntersection && !this.matrix.hasDot(linesIntersection)) {
      this.view.drawDot(
        this.view.getColorCode(this.nextPlayer, 0.6),
        this.getDotRadius(),
        linesIntersection.map(this.scaleCoord, this)
      );
    }
  }

  placeDotOnClick(e) {
    const linesIntersection = this.getClosestGridLinesIntersection([e.offsetX, e.offsetY]);

    if (linesIntersection && !this.matrix.hasDot(linesIntersection)) {
      this.matrix.placeDot(linesIntersection, this.nextPlayer);
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
