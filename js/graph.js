var Graph = function (dots) {
    this.dots = dots || [];
};

Graph.prototype.isNear = function (coords) {
    // todo: iterate over dots and check if distance to coords is 1 or √2
    return true;
};

module.exports = Graph;
