var assert = require('assert');
var cConsts = require('../constants').commandConstants;
var sConsts = require('../constants').stateConstants;
var CommandPlace = require('../cmdPlace').CommandPlace;

describe('CommandPlace', function () {
  describe('supports args as a', function () {
    it('dictionary', function () {
      var cmd = new CommandPlace({
        x: sConsts.minX,
        y: sConsts.minY,
        f: sConsts.Facings.NORTH
      });
      
      assert.equal(cmd.name, cConsts.Commands.PLACE);
      assert.equal(cmd.args.x, sConsts.minX);
      assert.equal(cmd.args.y, sConsts.minY);
      assert.equal(cmd.args.f, sConsts.Facings.NORTH);
    });
    
    it('array', function () {
      var cmd = new CommandPlace([sConsts.minX, sConsts.minY, sConsts.Facings.NORTH]);
      
      assert.equal(cmd.name, cConsts.Commands.PLACE);
      assert.equal(cmd.args.x, sConsts.minX);
      assert.equal(cmd.args.y, sConsts.minY);
      assert.equal(cmd.args.f, sConsts.Facings.NORTH);
    });    
  });
  
  describe('throws when', function () {
    it('the number of arguments is < 3', function () {
      assert.throws(function () {
        new CommandPlace('bla-bla-bla', [1, 2]);
      });
    });
    
    it('x is invalid number', function () {
      assert.throws(function () {
        CommandPlace(['abc', sConsts.minY, sConsts.Facings.NORTH]);
      });
    });
    
    it('y is invalid number', function () {
      assert.throws(function () {
        CommandPlace([sConsts.minX, 'cde', sConsts.Facings.NORTH]);
      });
    });
    
    it('facing is invalid', function () {
      assert.throws(function () {
        CommandPlace([sConsts.minX, sConsts.minY, 'bla-bla-bla']);
      });
    });
  });
});
