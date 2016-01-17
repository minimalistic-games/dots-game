var Graph = function (dots) {
    this.dots = new Set(dots || []);
    this.lines = Graph.defineAllLines(this.dots);
};

Graph.defineAllLines = function (dots) {
    var lines = new Set();

    for (var di of dots) {
        for (var lj of Graph.defineLines(di, dots)) {
            if (!Graph.hasLine(lj, lines)) {
                lines.add(lj);
            }
        }
    }

    return lines;
};

Graph.defineLines = function (d, dots) {
    var lines = new Set();

    for (var di of Graph.getRelatedDots(d, dots)) {
        lines.add(new Set([d, di]));
    }

    return lines;
};

Graph.hasLine = function (l, lines) {
    for (var li of lines) {
        var matched = 0;

        for (var dj of l) {
            matched += li.has(dj);
        }

        if (matched === 2) { return true; }
    }

    return false;
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

Graph.merge = function (graphs) {
    var merged = new Graph();

    for (var graph of graphs) {
        for (var di of graph.dots) {
            merged.dots.add(di);
        }
    }

    merged.lines = Graph.defineAllLines(merged.dots);

    return merged;
};

Graph.prototype.add = function (d) {
    for (var li of Graph.defineLines(d, this.dots)) {
        this.lines.add(li);
    }

    this.dots.add(d);
};

Graph.prototype.isRelated = function (d) {
    if (!this.dots.size) { return true; }
    return Boolean(Graph.getRelatedDots(d, this.dots).size);
};

module.exports = Graph;
