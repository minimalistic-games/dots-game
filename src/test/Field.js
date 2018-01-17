import { expect } from 'chai';
import { spy } from 'sinon';

import View from '../classes/View';
import Field from '../classes/Field';

describe('Field', () => {
  it('loads players data from "localStorage"', () => {
    // stub(localStorage, 'getItem').withArgs('players').returns(
    //   '{"red":[[[8,1],[8,2],[9,3]]],"blue":[[[7,2]],[[7,4]]]}'
    // );

    // const field = new Field({});
    // expect(field.players.red.size).to.equal(0);
    // expect(field.players.blue.size).to.equal(0);
    // expect(field.nextPlayer).to.equal('red');

    // field.load();
    // expect(field.players.red.size).to.equal(1);
    // expect(field.players.blue.size).to.equal(2);
    // expect(field.nextPlayer).to.equal('blue');

    // localStorage.getItem.restore();
  });

  it('saves players data to "localStorage"', () => {
    // spy(localStorage, 'setItem');

    // const field = new Field({});
    // field.save();
    // expect(localStorage.setItem.getCall(0).args[0]).to.be.equal('players');
    // expect(localStorage.setItem.getCall(0).args[1]).to.be.equal('{"red":[],"blue":[]}');

    // const graph = new Graph();
    // field.players.red.add(graph);
    // graph.dots.add([0, 0]);
    // field.save();
    // expect(localStorage.setItem.getCall(1).args[0]).to.be.equal('players');
    // expect(localStorage.setItem.getCall(1).args[1]).to.be.equal('{"red":[[[0,0]]],"blue":[]}');

    // localStorage.setItem.restore();
  });

  it('draws proper number of lines while drawing a grid', () => {
    const view600x600 = new View({
      canvas: {
        width: 600,
        height: 600,
      },
    });
    const field600x600 = new Field(null, view600x600, 40);
    View.prototype.drawLine = spy();
    View.prototype.drawStrokeRect = spy();
    field600x600.drawGrid();
    expect(view600x600.drawLine.callCount).to.equal(32);
    expect(view600x600.drawStrokeRect.callCount).to.equal(1);

    const view300x200 = new View({
      canvas: {
        width: 300,
        height: 200,
      },
    });
    const field300x200 = new Field(null, view300x200, 40);
    View.prototype.drawLine = spy();
    View.prototype.drawStrokeRect = spy();
    field300x200.drawGrid();
    expect(view300x200.drawLine.callCount).to.equal(14);
    expect(view300x200.drawStrokeRect.callCount).to.equal(1);
  });

  it('calculates closest grid lines intersection', () => {
    const field100 = new Field(null, null, 100);
    expect(field100.getClosestGridLinesIntersection([0, 0])).to.eql([0, 0]);
    expect(field100.getClosestGridLinesIntersection([0, 19])).to.eql([0, 0]);
    expect(field100.getClosestGridLinesIntersection([0, 20])).to.equal(null);

    const field10 = new Field(null, null, 10);
    expect(field10.getClosestGridLinesIntersection([38, 40])).to.equal(null);
    expect(field10.getClosestGridLinesIntersection([39, 40])).to.eql([4, 4]);
    expect(field10.getClosestGridLinesIntersection([40, 40])).to.eql([4, 4]);
    expect(field10.getClosestGridLinesIntersection([40, 50])).to.eql([4, 5]);
  });

  it('detects if dot is present', () => {
    // const field = new Field({});
    // const graph = new Graph();
    // field.players.red.add(graph);
    // expect(field.hasDot([0, 0])).to.equal(false);
    // graph.dots.add([0, 0]);
    // expect(field.hasDot([0, 0])).to.equal(true);
  });

  it('calculates dots number per player', () => {
    // const field = new Field({});
    // const graph = new Graph();
    // field.players.red.add(graph);
    // expect(field.getPlayerDotsNumber('red')).to.equal(0);
    // graph.dots.add([0, 0]);
    // expect(field.getPlayerDotsNumber('red')).to.equal(1);
    // graph.dots.add([0, 1]);
    // expect(field.getPlayerDotsNumber('red')).to.equal(2);
  });
});
