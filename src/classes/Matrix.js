export default class Matrix {
  constructor() {
    this.reset();
  }

  reset() {
    this.spots = [];
  }

  preset(dots) {
    this.spots = dots || [];
  }

  placeDot(coords, color) {
    if (!Array.isArray(this.spots[coords[0]])) {
      this.spots[coords[0]] = [];
    }

    this.spots[coords[0]][coords[1]] = color;
  }

  hasDot(coords) {
    if (!Array.isArray(this.spots[coords[0]])) {
      return false;
    }

    return Boolean(this.spots[coords[0]][coords[1]]);
  }

  getDots() {
    const dots = [];

    this.forEachDot((xi, yi, color) => {
      dots.push({
        coords: [xi, yi],
        color
      });
    });

    return dots;
  }

  countDots() {
    const dotsNumbers = {
      red: 0,
      blue: 0
    };

    this.forEachDot((xi, yi, color) => {
      dotsNumbers[color] += 1;
    });

    return dotsNumbers;
  }

  forEachDot(iteratee) {
    this.spots.forEach((x, xi) => {
      if (Array.isArray(x)) {
        x.forEach((y, yi) => {
          if (y) {
            iteratee(xi, yi, y);
          }
        });
      }
    });
  }
}
