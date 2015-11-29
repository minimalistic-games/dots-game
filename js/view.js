var View = function (ctx) {
    this.ctx = ctx;
    this.ctx.lineWidth = 1;
    this.ctx.font = '8px monospace';
    this.ctx.textBaseline = 'top';

    this.colors = {'red': [192, 32, 0],
                   'blue': [0, 32, 192]};
};

View.prototype.getColor = function (color, opacity) {
    return 'rgba(' + this.colors[color].concat(opacity).join(',') + ')';
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

View.prototype.drawStrokeRect = function (from, to) {
    this.ctx.strokeRect(from[0],
                        from[1],
                        to[0] - from[0],
                        to[1] - from[1]);
};

View.prototype.drawDot = function (style, cellSize, coords) {
    var x = coords[0] * cellSize;
    var y = coords[1] * cellSize;
    var radius = Math.max(cellSize / 5, 4);

    this.ctx.beginPath();
    this.ctx.arc(x,
                 y,
                 radius,
                 0,
                 2 * Math.PI,
                 false);
    this.ctx.fillStyle = style;
    this.ctx.fill();

    this.ctx.fillText('(' + coords[0] + ', ' + coords[1] + ')',
                      x + radius,
                      y + radius);
};

module.exports = View;
