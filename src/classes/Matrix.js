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

// eslint-disable-next-line no-unused-vars
function printPath(path) {
  // eslint-disable-next-line no-console
  console.log(path.length, path.map(({ coords: [x, y] }) => `(${x}, ${y})`).join('-'));
}

// "[1, 2, 3, 4]" equals to "[3, 2, 1, 4]" since "4" is a target dot
function arePathsEqual(p1, p2) {
  if (p1.length !== p2.length) {
    return false;
  }

  for (let i = 0; i < p1.length - 1; i += 1) {
    if (!p1[i].isEqual(p2[p1.length - i - 2])) {
      return false;
    }
  }

  return true;
}

function takeUniquePaths(allPaths) {
  const paths = allPaths.slice();
  let path = null;

  for (let i = 0; i < allPaths.length; i += 1) {
    path = paths[i];

    if (path !== null) {
      for (let j = i + 1; j < allPaths.length; j += 1) {
        if (paths[j] !== null && arePathsEqual(path, paths[j])) {
          paths[j] = null;
        }
      }
    }
  }

  return paths.filter((p) => p !== null);
}

function flattenPaths(nestedPaths) {
  let paths = [];

  nestedPaths.forEach((nestedPath) => {
    if (!nestedPath) {
      return;
    }

    if (nestedPath[0] instanceof Dot) {
      paths.push(nestedPath);
    } else {
      paths = paths.concat(flattenPaths(nestedPath));
    }
  });

  return paths;
}

export default class Matrix {
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

    if (adjacentDots.length < 2) {
      return;
    }

    const paths = adjacentDots.map((adjacentDot) => this.makePaths([adjacentDot], dot));
    const colorZones = this.zones[dot.color];

    takeUniquePaths(flattenPaths(paths)).forEach((path) => {
      colorZones.push(path);
      printPath(path);
    });
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
