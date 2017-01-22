export default class Graph {
  static defineAllLines(dots) {
    const lines = new Set();

    for (const di of dots) {
      for (const lj of Graph.defineLines(di, dots)) {
        if (!Graph.hasLine(lj, lines)) {
          lines.add(lj);
        }
      }
    }

    return lines;
  }

  static defineLines(d, dots) {
    const lines = new Set();

    for (const di of Graph.getRelatedDots(d, dots)) {
      lines.add(new Set([d, di]));
    }

    return lines;
  }

  static hasLine(l, lines) {
    for (const li of lines) {
      let matched = 0;

      for (const dj of l) {
        matched += li.has(dj);
      }

      if (matched === 2) { return true; }
    }

    return false;
  }

  static getRelatedDots(d, dots) {
    const relatedDots = new Set();

    for (const di of dots) {
      if (Graph.areRelatedDots(d, di)) {
        relatedDots.add(di);
      }
    }

    return relatedDots;
  }

  static areRelatedDots(d1, d2) {
    if (d1[0] === d2[0] && d1[1] === d2[1]) { return false; }
    if (Math.abs(d1[0] - d2[0]) > 1) { return false; }
    if (Math.abs(d1[1] - d2[1]) > 1) { return false; }
    return true;
  }

  static merge(graphs) {
    const merged = new Graph();

    for (const graph of graphs) {
      for (const di of graph.dots) {
        merged.dots.add(di);
      }
    }

    merged.lines = Graph.defineAllLines(merged.dots);

    return merged;
  }

  constructor(dots) {
    this.dots = new Set(dots || []);
    this.lines = Graph.defineAllLines(this.dots);
  }

  add(d) {
    for (const li of Graph.defineLines(d, this.dots)) {
      this.lines.add(li);
    }

    this.dots.add(d);
  }

  isRelated(d) {
    if (!this.dots.size) { return true; }
    return Boolean(Graph.getRelatedDots(d, this.dots).size);
  }
}
