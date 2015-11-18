var should = require('should');
var assert = require('assert');

var StateUndefined = require('../stateUndefined').StateUndefined;
var sConsts = require('../constants').stateConstants;
var StateMachine = require('../StateMachine');
var snReady = require('../constants').stateMachineConstants.stateNames.READY;
var snUdefined = require('../constants').stateMachineConstants.stateNames.UNDEFINED;

describe('StateUndefined', function () {
  describe('When created should', function () {
    var stateUndef, stateMachineMoq;

    before(function() {
      var states = {};

      states[snReady] = {};
      states[snUdefined] = {};
      stateMachineMoq = {
        states: states
      };

      stateUndef = new StateUndefined(stateMachineMoq);
    })
    
    it('ignonre "MOVE" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.MOVE
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('ignonre "REPORT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.REPORT
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('ignonre "LEFT" command', function () {
      stateUndef.next({
        name: sConsts.Commands.LEFT
      }).should.equal(stateUndef);
    });

    it('ignonre "RIGHT" command', function () {
      stateUndef.next({
        name: sConsts.Commands.RIGHT
      }).should.equal(stateUndef);
    });

    it('accept "PLACE" command', function() {
      var next = stateUndef.next({
        name: sConsts.Commands.PLACE,
        args: {x: 2, y: 3, f: sConsts.Facings.NORTH}
      });

      assert.equal(next, stateMachineMoq.states[snReady]);
    })
  });
});
