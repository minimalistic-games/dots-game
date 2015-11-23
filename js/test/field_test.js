var expect = require('chai').expect;
var sinon = require('sinon');

var Field = require('../field');

describe('Field', function () {
    it('draws proper number of lines while drawing a grid', function () {
        var field600x600 = new Field({canvas: {width: 600, height: 600}}, 40);
        Field.prototype.drawLine = sinon.spy();
        field600x600.drawGrid();
        expect(field600x600.drawLine.callCount).to.equal(32);

        var field300x200 = new Field({canvas: {width: 300, height: 200}}, 40);
        Field.prototype.drawLine = sinon.spy();
        field300x200.drawGrid();
        expect(field300x200.drawLine.callCount).to.equal(14);
    });

    it('calculates closest lines intersection', function () {
        var field100 = new Field({}, 100);
        expect(field100.getClosestLinesIntersection([0, 0])).to.eql([0, 0]);
        expect(field100.getClosestLinesIntersection([0, 19])).to.eql([0, 0]);
        expect(field100.getClosestLinesIntersection([0, 20])).to.equal(null);

        var field10 = new Field({}, 10);
        expect(field10.getClosestLinesIntersection([38, 40])).to.equal(null);
        expect(field10.getClosestLinesIntersection([39, 40])).to.eql([4, 4]);
        expect(field10.getClosestLinesIntersection([40, 40])).to.eql([4, 4]);
        expect(field10.getClosestLinesIntersection([40, 50])).to.eql([4, 5]);
    });
});
