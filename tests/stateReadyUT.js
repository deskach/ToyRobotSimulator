var assert = require('assert');

var StateReady = require('../stateReady').StateReady;
var sConsts = require('../constants').stateConstants;
var snReady = require('../constants').stateMachineConstants.stateNames.READY;
var snUndefined = require('../constants').stateMachineConstants.stateNames.UNDEFINED;

describe('StateReady', function () {
  var stateReady;

  function initVars() {
    states = {};
    states[snReady] = stateReady;
    states[snUndefined] = {};
    
    stateMachineMoq = {
      states: states
    };
    
    stateReady = new StateReady({
      stateMachine: stateMachineMoq
    });
  };
  
  describe('.next() accepts', function () {
    beforeEach(function () { initVars(); });
    
    it('MOVE command');
    
    it('REPORT command');
    
    it('LEFT command');
    
    it('RIGHT command');
    
    it('PLACE command');
  });

  describe('.run() processes', function () {
    beforeEach(function () { initVars(); });
    
    it('MOVE command');
    
    it('REPORT command');
    
    it('LEFT command');
    
    it('RIGHT command');
    
    it('PLACE command');
  })

})