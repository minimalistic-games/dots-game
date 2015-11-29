var expect = require('chai').expect;
var sinon = require('sinon');

var View = require('../view');
var Field = require('../field');

describe('Field', function () {
    it('draws proper number of lines while drawing a grid', function () {
        var view600x600 = new View({canvas: {width: 600, height: 600}});
        var field600x600 = new Field(view600x600, 40);
        View.prototype.drawLine = sinon.spy();
        View.prototype.drawStrokeRect = sinon.spy();
        field600x600.drawGrid();
        expect(view600x600.drawLine.callCount).to.equal(32);
        expect(view600x600.drawStrokeRect.callCount).to.equal(1);

        var view300x200 = new View({canvas: {width: 300, height: 200}});
        var field300x200 = new Field(view300x200, 40);
        View.prototype.drawLine = sinon.spy();
        View.prototype.drawStrokeRect = sinon.spy();
        field300x200.drawGrid();
        expect(view300x200.drawLine.callCount).to.equal(14);
        expect(view300x200.drawStrokeRect.callCount).to.equal(1);
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

    it('detects if dot is present', function () {
        var field = new Field({});
        expect(field.hasDot([0, 0])).to.equal(false);
        field.dots.push([0, 0]);
        expect(field.hasDot([0, 0])).to.equal(true);
    });
});
