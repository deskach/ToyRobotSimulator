var StateUndefined = require('./stateUndefined').StateUndefined;
var StateReady = require('./stateReady').StateReady;
var StateMachine = require('./stateMachine').StateMachine;
var CommandFactory = require('./cmdFactory.js').CommandFactory;
var cmdConsts = require('./constants').commandConstants;

var states = [new StateUndefined(), new StateReady()];
var stateMachine = new StateMachine(states, StateUndefined.prototype.name());
var cmdFactory = new CommandFactory();
var stdin = process.openStdin();
var input = [];

stdin.addListener("data", function (d) {
  var strCmd = d.toString().trim();

  if (strCmd.length > 0) {
    var cmd = cmdFactory.create(strCmd);
        
    input.push(cmd);
  } else {
    stateMachine.runAll(input);
    input = [];
  }
});
