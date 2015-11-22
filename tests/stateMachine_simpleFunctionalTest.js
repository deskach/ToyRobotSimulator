/**
 * Created by Dzianis on 19/11/2015.
 */
var assert = require('assert');

var StateUndefined = require('../stateUndefined');
var StateReady = require('../stateReady');
var StateMachine = require('../stateMachine');
var sConsts = require('../constants').stateConstants;

describe('StateMachine should run', function () {
    var states,  stateMachine, strOutput

    beforeEach(function() {
        strOutput = '';
    });

    states = [
        new StateUndefined(),
        new StateReady({
            'onReport': function (output) {
            strOutput += output;
        }})
    ];
    stateMachine = new StateMachine(states,
        StateUndefined.prototype.name());

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
