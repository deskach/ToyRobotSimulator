var assert = require('assert');

var StateUndefined = require('../stateUndefined').StateUndefined;
var StateReady = require('../stateReady').StateReady;
var StateMachine = require('../stateMachine').StateMachine;
var sConsts = require('../constants').stateConstants;

var states = [new StateUndefined(), new StateReady()];
var stateMachine = new StateMachine(states, StateUndefined.prototype.name())

var strOutput = '';

// Overwrite out method for testing purposes
stateMachine.out = function (output) {
  strOutput += output;
}

/*
 * PLACE  0,0,NORTH 
 * MOVE   
 * REPORT   
 * Output:  0,1,NORTH
*/
var testSuit1 = [ 
  {
    name: sConsts.Commands.PLACE, 
    args: { x: 0, y: 0, f: sConsts.Facings.NORTH }
  },
  { name: sConsts.Commands.MOVE },
  { name: sConsts.Commands.REPORT }
]

strOutput = '';
stateMachine.runAll(testSuit1);
assert.equal(strOutput, '0,1,NORTH');
console.log("Test 1 PASSED. Output: " + strOutput);

/*
 * PLACE  0,0,NORTH   
 * LEFT   
 * REPORT   
 * Output:  0,0,WEST  
*/
var testSuit2 = [ 
  {
    name: sConsts.Commands.PLACE, 
    args: { x: 0, y: 0, f: sConsts.Facings.NORTH }
  },
  { name: sConsts.Commands.LEFT },
  { name: sConsts.Commands.REPORT }
]

strOutput = '';
stateMachine.runAll(testSuit2);
assert.equal(strOutput, '0,0,WEST');
console.log("Test 2 PASSED. Output: " + strOutput);

/*
 * PLACE  1,2,EAST   
 * MOVE   
 * MOVE   
 * LEFT   
 * MOVE   
 * REPORT   
 * Output:  3,3,NORTH  
*/
var testSuit3 = [ 
  {
    name: sConsts.Commands.PLACE, 
    args: { x: 1, y: 2, f: sConsts.Facings.EAST }
  },
  { name: sConsts.Commands.MOVE },
  { name: sConsts.Commands.MOVE },
  { name: sConsts.Commands.LEFT },
  { name: sConsts.Commands.MOVE },
  { name: sConsts.Commands.REPORT },
]

strOutput = '';
stateMachine.runAll(testSuit3);
assert.equal(strOutput, '3,3,NORTH');
console.log("Test 2 PASSED. Output: " + strOutput);


