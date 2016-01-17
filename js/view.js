var View = function (ctx) {
    this.ctx = ctx;

    this.colors = {'black': [0, 0, 0],
                   'red': [192, 32, 0],
                   'blue': [0, 32, 192]};
};

View.prototype.getColor = function (colorName, opacity) {
    return 'rgba(' + this.colors[colorName].concat(opacity).join(',') + ')';
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

View.prototype.drawLine = function (style, lineWidth, from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from[0], from[1]);
    this.ctx.lineTo(to[0], to[1]);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = style;
    this.ctx.stroke();
};

View.prototype.drawStrokeRect = function (from, to) {
    this.ctx.strokeRect(from[0],
                        from[1],
                        to[0] - from[0],
                        to[1] - from[1]);
};

View.prototype.drawDot = function (style, radius, coords) {
    this.ctx.beginPath();
    this.ctx.arc(coords[0],
                 coords[1],
                 radius,
                 0,
                 2 * Math.PI,
                 false);
    this.ctx.fillStyle = style;
    this.ctx.fill();
};

module.exports = View;
