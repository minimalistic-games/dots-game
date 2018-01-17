export default class View {
  constructor(ctx) {
    this.ctx = ctx;

    this.colorCodes = {
      white: [255, 255, 255],
      red: [192, 64, 0],
      blue: [0, 96, 192],
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
      this.ctx.canvas.height,
    ];
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    );
  }

  drawLine(color, dashed, lineWidth, [fromX, fromY], [toX, toY]) {
    this.ctx.setLineDash(dashed ? [2, 4] : []);
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawStrokeRect([fromX, fromY], [toX, toY]) {
    this.ctx.setLineDash([]);
    this.ctx.strokeRect(
      fromX,
      fromY,
      toX - fromX,
      toY - fromY,
    );
  }

  drawDot(style, radius, [x, y]) {
    this.ctx.beginPath();
    this.ctx.arc(
      x,
      y,
      radius,
      0,
      2 * Math.PI,
      false,
    );
    this.ctx.fillStyle = style;
    this.ctx.fill();
  }

  drawDotCoords(style, radius, [x, y], [coordX, coordY]) {
    this.ctx.fillStyle = style;
    this.ctx.fillText(
      `(${coordX}, ${coordY})`,
      x + radius,
      y - radius,
    );
  }
}
