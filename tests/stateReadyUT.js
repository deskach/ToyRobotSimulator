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
  
  describe('.next()', function () {
    describe('accepts commands', function () {
      beforeEach(function () { initVars(); });
      
      it('MOVE');
      
      it('REPORT');
      
      it('LEFT');
      
      it('RIGHT');
      
      it('PLACE');
    });
  });

  describe('.run()', function () {
    describe('processes commands', function () {
      beforeEach(function () { initVars(); });
      
      it('MOVE');
      
      it('REPORT');
      
      it('LEFT');
      
      it('RIGHT');
      
      it('PLACE');
    });
  })

})