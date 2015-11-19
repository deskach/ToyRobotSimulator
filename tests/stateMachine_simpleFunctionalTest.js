/**
 * Created by Dzianis on 19/11/2015.
 */
var assert = require('assert');
var beforeEach = require('mocha/lib/mocha.js').beforeEach;
var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var StateUndefined = require('../stateUndefined').StateUndefined;
var StateReady = require('../stateReady').StateReady;
var StateMachine = require('../stateMachine').StateMachine;
var sConsts = require('../constants').stateConstants;

var strOutput;

beforeEach(function() {
    strOutput = '';
});

describe('StateMachine should run', function () {
    var states,  stateMachine;

    states = [new StateUndefined(), new StateReady()];
    stateMachine = new StateMachine(states,
        StateUndefined.prototype.name());

    // Overwrite out method for testing purposes
    stateMachine.out = function (output) {
        strOutput += output;
    };

    it('"PLACE 0,0,NORTH" "MOVE "REPORT"', function() {
        // Expected Output:  0,1,NORTH
        var testSuit1 = [
            {
                name: sConsts.Commands.PLACE,
                args: {x: 0, y: 0, f: sConsts.Facings.NORTH}
            },
            {name: sConsts.Commands.MOVE},
            {name: sConsts.Commands.REPORT}
        ];

        stateMachine.runAll(testSuit1);
        assert.equal(strOutput, '0,1,NORTH');
    });

    it('"PLACE 0,0,NORTH" "LEFT" "REPORT"', function() {
        // Expected Output:  0,0,WEST
        var testSuit2 = [
            {
                name: sConsts.Commands.PLACE,
                args: {x: 0, y: 0, f: sConsts.Facings.NORTH}
            },
            {name: sConsts.Commands.LEFT},
            {name: sConsts.Commands.REPORT}
        ];

        stateMachine.runAll(testSuit2);
        assert.equal(strOutput, '0,0,WEST');
    });

    it('"PLACE 1,2,EAST" "MOVE" "MOVE" "LEFT" "MOVE" "REPORT"', function() {
        //Expected Output:  3,3,NORTH  
        var testSuit3 = [
            {
                name: sConsts.Commands.PLACE,
                args: {x: 1, y: 2, f: sConsts.Facings.EAST}
            },
            {name: sConsts.Commands.MOVE},
            {name: sConsts.Commands.MOVE},
            {name: sConsts.Commands.LEFT},
            {name: sConsts.Commands.MOVE},
            {name: sConsts.Commands.REPORT}
        ];

        stateMachine.runAll(testSuit3);
        assert.equal(strOutput, '3,3,NORTH');
    });
});
