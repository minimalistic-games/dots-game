export default class View {
  constructor(ctx) {
    this.ctx = ctx;

    this.colorCodes = {
      white: [255, 255, 255],
      red: [192, 64, 0],
      blue: [0, 64, 192]
    };
  }

  getColorCode(color, opacity) {
    return `rgba(${this.colorCodes[color].concat(opacity).join(',')})`;
  }

  listenTo(e, callback) {
    this.ctx.canvas.addEventListener(e, callback);
  }

  getDimensions() {
    return [
      this.ctx.canvas.width,
      this.ctx.canvas.height
    ];
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
  }

  drawLine(color, dashed, lineWidth, from, to) {
    this.ctx.setLineDash(dashed ? [2, 4] : []);
    this.ctx.beginPath();
    this.ctx.moveTo(from[0], from[1]);
    this.ctx.lineTo(to[0], to[1]);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawStrokeRect(from, to) {
    this.ctx.strokeRect(
      from[0],
      from[1],
      to[0] - from[0],
      to[1] - from[1]
    );
  }

  drawDot(style, radius, coords) {
    this.ctx.beginPath();
    this.ctx.arc(
      coords[0],
      coords[1],
      radius,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = style;
    this.ctx.fill();
  }
}
