var assert = require('assert');
var cConsts = require('../constants').commandConstants;
var CommandFactory = require('../cmdFactory').CommandFactory;
var CommandBase = require('../cmdBase').CommandBase;

describe('CommandBase', function () {
  it('supports name property', function () {
    var cmd = new CommandBase(cConsts.Commands.REPORT);
    
    assert.equal(cmd.name, cConsts.Commands.REPORT);
  });
  
  it('throws when a wrong command name is provided', function () {
    assert.throws(function () {
      new CommandBase('bla-bla-bla');
    }, 'bla-bla-bla');
  });
  
  
  it('supports args dictionary', function () { 
    var testDict = {};
    var cmd = new CommandBase(cConsts.Commands.REPORT, testDict);
    
    assert.equal(cmd.args, testDict);
  });
});
