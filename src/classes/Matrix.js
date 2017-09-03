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

  placeDot([x, y], color) {
    if (!Array.isArray(this.spots[x])) {
      this.spots[x] = [];
    }

    this.spots[x][y] = color;
  }

  hasDot([x, y]) {
    if (!Array.isArray(this.spots[x])) {
      return false;
    }

    return Boolean(this.spots[x][y]);
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
