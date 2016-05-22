/* global describe, it */

import { expect } from 'chai';
import sinon from 'sinon';

import View from '../view';
import Graph from '../graph';
import Field from '../field';

describe('Field', () => {
    it('draws proper number of lines while drawing a grid', () => {
        const view600x600 = new View({
            canvas: {
                width: 600,
                height: 600
            }
        });
        const field600x600 = new Field(view600x600, 40);
        View.prototype.drawLine = sinon.spy();
        View.prototype.drawStrokeRect = sinon.spy();
        field600x600.drawGrid();
        expect(view600x600.drawLine.callCount).to.equal(32);
        expect(view600x600.drawStrokeRect.callCount).to.equal(1);

        const view300x200 = new View({
            canvas: {
                width: 300,
                height: 200
            }
        });
        const field300x200 = new Field(view300x200, 40);
        View.prototype.drawLine = sinon.spy();
        View.prototype.drawStrokeRect = sinon.spy();
        field300x200.drawGrid();
        expect(view300x200.drawLine.callCount).to.equal(14);
        expect(view300x200.drawStrokeRect.callCount).to.equal(1);
    });

    it('calculates closest grid lines intersection', () => {
        const field100 = new Field({}, 100);
        expect(field100.getClosestGridLinesIntersection([0, 0])).to.eql([0, 0]);
        expect(field100.getClosestGridLinesIntersection([0, 19])).to.eql([0, 0]);
        expect(field100.getClosestGridLinesIntersection([0, 20])).to.equal(null);

        const field10 = new Field({}, 10);
        expect(field10.getClosestGridLinesIntersection([38, 40])).to.equal(null);
        expect(field10.getClosestGridLinesIntersection([39, 40])).to.eql([4, 4]);
        expect(field10.getClosestGridLinesIntersection([40, 40])).to.eql([4, 4]);
        expect(field10.getClosestGridLinesIntersection([40, 50])).to.eql([4, 5]);
    });

    it('detects if dot is present', () => {
        const field = new Field({});
        const graph = new Graph();
        field.players.red.add(graph);
        expect(field.hasDot([0, 0])).to.equal(false);
        graph.dots.add([0, 0]);
        expect(field.hasDot([0, 0])).to.equal(true);
    });

    it('calculates gots number per player', () => {
        const field = new Field({});
        const graph = new Graph();
        field.players.red.add(graph);
        expect(field.getPlayerDotsNumber('red')).to.equal(0);
        graph.dots.add([0, 0]);
        expect(field.getPlayerDotsNumber('red')).to.equal(1);
        graph.dots.add([0, 1]);
        expect(field.getPlayerDotsNumber('red')).to.equal(2);
    });
});
