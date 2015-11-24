var View = function (ctx) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;
};

View.prototype.listenTo = function (e, callback) {
    this.ctx.canvas.addEventListener(e, callback);
};

View.prototype.getDimensions = function () {
    return [this.ctx.canvas.width,
            this.ctx.canvas.height];
};

View.prototype.clear = function () {
    this.ctx.clearRect(0,
                       0,
                       this.ctx.canvas.width,
                       this.ctx.canvas.height);
};

View.prototype.drawLine = function (from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from[0], from[1]);
    this.ctx.lineTo(to[0], to[1]);
    this.ctx.stroke();
};

View.prototype.drawDot = function (style, cellSize, coords) {
    this.ctx.beginPath();
    this.ctx.arc(coords[0] * cellSize,
                 coords[1] * cellSize,
                 Math.max(cellSize / 5, 4),
                 0,
                 2 * Math.PI,
                 false);
    this.ctx.fillStyle = style;
    this.ctx.fill();
};

module.exports = View;
