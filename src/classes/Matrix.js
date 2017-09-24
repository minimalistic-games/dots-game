class Dot {
  constructor(coords, color) {
    this.coords = coords;
    this.color = color;
  }

  isEqual(dot) {
    return this.coords[0] === dot.coords[0] && this.coords[1] === dot.coords[1];
  }

  inPath(path) {
    return path.some((dot) => this.isEqual(dot));
  }
}

export default class Matrix {
  static printPath(path) {
    // eslint-disable-next-line no-console
    console.log(path.map(({ coords: [x, y] }) => `(${x}, ${y})`).join(' -> '));
  }

  constructor() {
    this.reset();
  }

  reset() {
    this.spots = [];
    this.zones = {
      red: [],
      blue: []
    };
  }

  preset(dots) {
    this.spots = dots || [];
  }

  placeDot([x, y], color) {
    if (!Array.isArray(this.spots[x])) {
      this.spots[x] = [];
    }

    this.spots[x][y] = color;

    return new Dot([x, y], color);
  }

  getDot([x, y]) {
    if (!Array.isArray(this.spots[x])) {
      return null;
    }

    const color = this.spots[x][y];

    if (!color) {
      return null;
    }

    return new Dot([x, y], color);
  }

  getAllDots() {
    const dots = [];

    this.forEachDot(([x, y], color) => {
      dots.push(new Dot([x, y], color));
    });

    return dots;
  }

  getAdjacentDots(dot) {
    const { coords: [x, y], color } = dot;
    const dots = [];
    let adjacentDot = null;

    for (let xi = x - 1; xi <= x + 1; xi += 1) {
      for (let yi = y - 1; yi <= y + 1; yi += 1) {
        if (!(xi === x && yi === y)) {
          adjacentDot = this.getDot([xi, yi]);

          if (adjacentDot && adjacentDot.color === color) {
            dots.push(adjacentDot);
          }
        }
      }
    }

    return dots;
  }

  countDots() {
    const dotsNumbers = {
      red: 0,
      blue: 0
    };

    this.forEachDot((_, color) => {
      dotsNumbers[color] += 1;
    });

    return dotsNumbers;
  }

  addDotToZones(dot) {
    const adjacentDots = this.getAdjacentDots(dot);

    if (adjacentDots.length > 1) {
      const paths = adjacentDots.map((adjacentDot) => this.makePaths([adjacentDot], dot));
      const colorZones = this.zones[dot.color];

      this.flattenPaths(paths).forEach((path) => {
        if (path.length) {
          colorZones.push(path);
        }
      });
    }
  }

  makePaths(fromPath, toDot) {
    const paths = [];

    this.getAdjacentDots(fromPath[fromPath.length - 1]).forEach((adjacentDot) => {
      if (adjacentDot.isEqual(toDot)) {
        if (fromPath.length > 2) {
          paths.push(fromPath.concat(toDot));
        }

        return;
      }

      if (adjacentDot.inPath(fromPath)) {
        return;
      }

      paths.push(this.makePaths(fromPath.concat(adjacentDot), toDot));
    });

    return paths.length ? paths : null;
  }

  flattenPaths(nestedPaths) {
    let paths = [];

    nestedPaths.forEach((nestedPath) => {
      if (!nestedPath) {
        return;
      }

      if (nestedPath[0] instanceof Dot) {
        paths.push(nestedPath);
      } else {
        paths = paths.concat(this.flattenPaths(nestedPath));
      }
    });

    return paths;
  }

  forEachDot(iteratee) {
    this.spots.forEach((column, x) => {
      if (Array.isArray(column)) {
        column.forEach((color, y) => {
          if (color) {
            iteratee([x, y], color);
          }
        });
      }
    });
  }
}
