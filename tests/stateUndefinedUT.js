var assert = require('assert');

var StateUndefined = require('../stateUndefined').StateUndefined;
var sConsts = require('../constants').stateConstants;
var snReady = require('../constants').stateMachineConstants.stateNames.READY;
var snUndefined = require('../constants').stateMachineConstants.stateNames.UNDEFINED;

describe('StateUndefined', function () {
  var stateUndef, stateMachineMoq, states;

  beforeEach(function() {
    states = {};
    states[snReady] = {};
    states[snUndefined] = stateUndef;

    stateMachineMoq = {
      states: states
    };

    stateUndef = new StateUndefined({
      stateMachine: stateMachineMoq});
  });

  describe('When created should', function () {
    it('ignore "MOVE" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.MOVE
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('ignore "REPORT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.REPORT
      });
      assert.deepEqual(next, stateUndef);
    });
    
    it('ignore "LEFT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.LEFT
      });
      assert.deepEqual(next, stateUndef);
    });

    it('ignore "RIGHT" command', function () {
      var next = stateUndef.next({
        name: sConsts.Commands.RIGHT
      });
      assert.deepEqual(next, stateUndef);
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
