var Graph = function (dots) {
    this.dots = new Set(dots || []);
    this.lines = Graph.defineAllLines(this.dots);
};

Graph.defineAllLines = function (dots) {
    var lines = new Set();

    for (var di of dots) {
        for (var li of Graph.defineLines(di, dots)) {
            lines.add(li);
        }
    }

    return lines;
};

Graph.defineLines = function (d, dots) {
    var lines = new Set();

    for (var di of Graph.getRelatedDots(d, dots)) {
        // todo: don't add duplicated lines,
        //       e.g. "{d2, d1}" if "{d1, d2}" already exists
        lines.add(new Set([d, di]));
    }

    return lines;
};

Graph.getRelatedDots = function (d, dots) {
    var relatedDots = new Set();

    for (var di of dots) {
        if (Graph.areRelatedDots(d, di)) {
            relatedDots.add(di);
        }
    }

    return relatedDots;
};

Graph.areRelatedDots = function (d1, d2) {
    if (d1[0] === d2[0] && d1[1] === d2[1]) { return false; }
    if (Math.abs(d1[0] - d2[0]) > 1) { return false; }
    if (Math.abs(d1[1] - d2[1]) > 1) { return false; }
    return true;
};

Graph.prototype.add = function (d) {
    for (var li of Graph.defineLines(d, this.dots)) {
        this.lines.add(li);
    }

    this.dots.add(d);
};

Graph.prototype.isNear = function (d) {
    if (!this.dots.size) { return true; }
    return Boolean(Graph.getRelatedDots(d, this.dots).size);
};

module.exports = Graph;
