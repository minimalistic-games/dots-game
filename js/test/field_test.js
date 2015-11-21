var expect = require('chai').expect;
var sinon = require('sinon');

var Field = require('../field');

describe('Field', function () {
    it('draws proper number of lines while drawing a grid', function () {
        var field600x600 = new Field({canvas: {width: 600, height: 600}});
        Field.prototype.drawLine = sinon.spy();
        field600x600.drawGrid(40);
        expect(field600x600.drawLine.callCount).to.equal(32);

        var field300x200 = new Field({canvas: {width: 300, height: 200}});
        Field.prototype.drawLine = sinon.spy();
        field300x200.drawGrid(40);
        expect(field300x200.drawLine.callCount).to.equal(14);
    });

    it('calculates closest lines intersection', function () {
        var closest = (new Field({})).getClosestLinesIntersection;

        expect(closest([0, 0], 100)).to.eql([0, 0]);
        expect(closest([0, 19], 100)).to.eql([0, 0]);
        expect(closest([0, 20], 100)).to.equal(null);
        expect(closest([38, 40], 10)).to.equal(null);
        expect(closest([39, 40], 10)).to.eql([4, 4]);
        expect(closest([40, 40], 10)).to.eql([4, 4]);
        expect(closest([40, 50], 10)).to.eql([4, 5]);
    });
});
