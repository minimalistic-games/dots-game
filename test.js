var expect = require('chai').expect,
    sinon = require('sinon'),
    Field = require('./index');

describe('Field', function () {
    it('draws proper number of lines while drawing a grid', function () {
        var field_600_600 = new Field({canvas: {width: 600, height: 600}});
        Field.prototype.drawLine = sinon.spy();
        field_600_600.drawGrid(40);
        expect(field_600_600.drawLine.callCount).to.equal(32);

        var field_300_200 = new Field({canvas: {width: 300, height: 200}});
        Field.prototype.drawLine = sinon.spy();
        field_300_200.drawGrid(40);
        expect(field_300_200.drawLine.callCount).to.equal(14);
    });
});
