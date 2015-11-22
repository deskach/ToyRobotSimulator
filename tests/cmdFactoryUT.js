var assert = require('assert');
var cConsts = require('../constants').commandConstants;
var sConsts = require('../constants').stateConstants;
var CommandFactory = require('../cmdFactory').CommandFactory;
var CommandPlace = require('../cmdPlace').CommandPlace;
var CommandBase = require('../cmdBase');

describe('CommandFactory', function () {
  it('provides default constructors', function () {
    var cmdF = new CommandFactory();

    assert(cmdF.hasOwnProperty('cmd2creator'));
  });
  
  it('can be configured to use custom constructors', function () {
    var creatorsMoq = {};
    var cmdF = new CommandFactory(creatorsMoq);
    
    assert.equal(cmdF.cmd2creator, creatorsMoq);
  });
  
  describe('default constructors can handle', function () {
    var cmdF;
    
    beforeEach(function () { 
      cmdF = new CommandFactory();
    });

    it('PLACE 0,0,EAST', function () {
      var s = cConsts.Commands.PLACE + ' ' + [
        sConsts.minX, sConsts.minY, sConsts.Facings.EAST
      ].join(',');
      var cmd = cmdF.create(s);
      
      assert(cmd instanceof CommandPlace);
      assert.equal(cmd.args.x, sConsts.minX);
      assert.equal(cmd.args.y, sConsts.minY);
      assert.equal(cmd.args.f, sConsts.Facings.EAST);
    });

    it('LEFT', function () {
      var s = cConsts.Commands.LEFT;
      var cmd = cmdF.create(s);
      
      assert(cmd instanceof CommandBase);
      assert.equal(cmd.name, cConsts.Commands.LEFT);
    });
    
    it('RIGHT', function () {
      var s = cConsts.Commands.RIGHT;
      var cmd = cmdF.create(s);
      
      assert(cmd instanceof CommandBase);
      assert.equal(cmd.name, cConsts.Commands.RIGHT);
    });
    
    it('MOVE', function () {
      var s = cConsts.Commands.MOVE;
      var cmd = cmdF.create(s);
      
      assert(cmd instanceof CommandBase);
      assert.equal(cmd.name, cConsts.Commands.MOVE);
    });
    
    it('REPORT', function () {
      var s = cConsts.Commands.REPORT;
      var cmd = cmdF.create(s);
      
      assert(cmd instanceof CommandBase);
      assert.equal(cmd.name, cConsts.Commands.REPORT);
    });
  });
});
