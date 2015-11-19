﻿var assert = require('assert');

var StateUndefined = require('../stateUndefined').StateUndefined;
var sConsts = require('../constants').stateConstants;
var snReady = require('../constants').stateMachineConstants.stateNames.READY;
var snUndefined = require('../constants').stateMachineConstants.stateNames.UNDEFINED;

describe('StateUndefined', function () {
  var stateUndef, stateMachineMoq, states;
  
  function initVars() {
    states = {};
    states[snReady] = {};
    states[snUndefined] = stateUndef;
    
    stateMachineMoq = {
      states: states
    };
    
    stateUndef = new StateUndefined({
      stateMachine: stateMachineMoq
    });
  }
  
  describe('.next() ignores', function () {
    beforeEach(function () { initVars(); });
    
    it('"MOVE" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.MOVE
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('"REPORT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.REPORT
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('"LEFT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.LEFT
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('"RIGHT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.RIGHT
      });
      assert.deepEqual(next, stateUndef);
    });
  });
  
  describe('.next() accepts', function () {
    beforeEach(function () { initVars(); });
    
    it('"PLACE 0,0,NORTH" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.PLACE,
        args: { x: sConsts.minX, y: sConsts.minY, f: sConsts.Facings.NORTH }
      });
      
      assert.equal(next, stateMachineMoq.states[snReady]);
    });
  });
  
  describe('.next() throws on', function () {
    beforeEach(function () { initVars(); });
    
    it('"PLACE 5,0,NORTH" command', function () {
      assert.throws(function () {
        stateUndef.next({
          name: sConsts.Commands.PLACE,
          args: { x: sConsts.maxX, y: sConsts.minY, f: sConsts.Facings.NORTH }
        }, sConsts.Exceptions.badX);
      })
    })

    it('"PLACE 0,5,NORTH" command', function () {
      assert.throws(function () {
        stateUndef.next({
          name: sConsts.Commands.PLACE,
          args: { x: sConsts.minX, y: sConsts.maxY, f: sConsts.Facings.NORTH }
        }, sConsts.Exceptions.badX);
      })
    })
  });
});
