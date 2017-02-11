/* eslint no-multi-spaces: "off" */

import { expect } from 'chai';

import Graph from '../Graph';

function linesToArray(lines) {
  return Array.from(lines).map((s) => Array.from(s));
}

describe('Graph', () => {
  it('checks if two dots are related', () => {
    expect(Graph.areRelatedDots([0, 0], [0, 0])).to.equal(false);
    expect(Graph.areRelatedDots([0, 0], [2, 0])).to.equal(false);
    expect(Graph.areRelatedDots([0, 0], [0, 2])).to.equal(false);
    expect(Graph.areRelatedDots([0, 0], [1, 0])).to.equal(true);
    expect(Graph.areRelatedDots([0, 0], [0, 1])).to.equal(true);
    expect(Graph.areRelatedDots([0, 0], [1, 1])).to.equal(true);
  });

  it('gets all related dots for a given one', () => {
    const graphDotsArray = [
      [0, 0],
      [0, 1], [1, 1], [2, 1],
              [1, 2],
              [1, 3], [2, 3], [3, 3]
    ];
    const relatedDotsArray = [
      [0, 0],
      [0, 1],         [2, 1],
              [1, 2]
    ];
    expect(Array.from(Graph.getRelatedDots(
        [1, 1],
        new Set(graphDotsArray)
    ))).to.eql(relatedDotsArray);
  });

  it('adds dots', () => {
    const graph = new Graph();

    expect(Array.from(graph.dots)).to.eql([]);
    expect(linesToArray(graph.lines)).to.eql([]);

    graph.add([0, 0]);
    expect(Array.from(graph.dots)).to.eql([
      [0, 0]
    ]);
    expect(linesToArray(graph.lines)).to.eql([]);

    graph.add([0, 1]);
    expect(Array.from(graph.dots)).to.eql([
      [0, 0],
      [0, 1]
    ]);
    expect(linesToArray(graph.lines)).to.eql([
      [
        [0, 1],
        [0, 0]
      ]
    ]);

    graph.add([1, 1]);
    expect(Array.from(graph.dots)).to.eql([
      [0, 0],
      [0, 1],
      [1, 1]
    ]);
    expect(linesToArray(graph.lines)).to.eql([
      [
        [0, 1],
        [0, 0]
      ],
      [
        [1, 1],
        [0, 0]
      ],
      [
        [1, 1],
        [0, 1]
      ]
    ]);
  });

  it('merges graphs', () => {
    const graphs = new Set([
      new Graph([
        [0, 0]
      ]),
      new Graph([
        [0, 1],
        [1, 1]
      ]),
      new Graph([
        [1, 2]
      ])
    ]);
    const merged = Graph.merge(graphs);
    expect(Array.from(merged.dots)).to.eql([
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2]
    ]);
    expect(linesToArray(merged.lines)).to.eql([
      [
        [0, 0], [0, 1]
      ],
      [
        [0, 0], [1, 1]
      ],
      [
        [0, 1], [1, 1]
      ],
      [
        [0, 1], [1, 2]
      ],
      [
        [1, 1], [1, 2]
      ]
    ]);
  });
});
