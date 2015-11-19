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
    
    stateReady = stateReady.next({
      name: sConsts.Commands.PLACE,
      args: { x: sConsts.minX, y: sConsts.minY, f: sConsts.Facings.EAST }
    });
    
    stateReady.run();
  };
  
  it('processes "PLACE 2,2,EAST" command', function () {
    var stReady = new StateReady();
    
    stReady = stReady.next({
      name: sConsts.Commands.PLACE,
      args: { x: 2, y: 2, f: sConsts.Facings.EAST }
    });
    
    stReady.run();
    
    assert.equal(stReady.x, 2);
    assert.equal(stReady.y, 2);
    assert.equal(stReady.f, sConsts.Facings.EAST);
  });
  
  describe('after "PLACE 2,2,EAST" processes commands', function () {
    beforeEach(function () { initVars(); });
    
    it('MOVE', function () {
      var oldX = stateReady.x;
      var oldY = stateReady.y;
      var oldF = stateReady.f;
      
      stateReady = stateReady.next({
        name: sConsts.Commands.MOVE
      });
      
      stateReady.run();
      
      assert.equal(stateReady.x, oldX + 1);
      assert.equal(stateReady.y, oldY);
      assert.equal(stateReady.f, oldF);
    });
    
    it('REPORT', function () {
      var s = '';
      var oldX = stateReady.x;
      var oldY = stateReady.y;
      var oldF = stateReady.f;

      stateReady.report = function (msg) {
        s = msg;
      }

      stateReady = stateReady.next({
        name: sConsts.Commands.REPORT
      });
      
      var oldState = JSON.stringify(stateReady);

      stateReady.run();

      assert.equal(oldState, JSON.stringify(stateReady));
      assert.equal(s, [oldX, oldY, oldF].join(','));
    });
    
    it('LEFT', function () {
      var s = '';
      var oldX = stateReady.x;
      var oldY = stateReady.y;
      var oldF = stateReady.f;
      
      var face2face = {};
      face2face[sConsts.Facings.EAST] = sConsts

      stateReady = stateReady.next({
        name: sConsts.Commands.LEFT
      });
      
      stateReady.run();

      assert.equal(stateReady.x, oldX);
      assert.equal(stateReady.y, oldY);
      assert.equal(oldF, sConsts.Facings.EAST);
      assert.equal(stateReady.f, sConsts.Facings.NORTH);      
    });
    
    it('RIGHT', function () {
      var s = '';
      var oldX = stateReady.x;
      var oldY = stateReady.y;
      var oldF = stateReady.f;
      
      var face2face = {};
      face2face[sConsts.Facings.EAST] = sConsts
      
      stateReady = stateReady.next({
        name: sConsts.Commands.RIGHT
      });
      
      stateReady.run();
      
      assert.equal(stateReady.x, oldX);
      assert.equal(stateReady.y, oldY);
      assert.equal(oldF, sConsts.Facings.EAST);
      assert.equal(stateReady.f, sConsts.Facings.SOUTH);    
    });
  });
  
})